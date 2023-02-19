import { SectionTitle } from "pages";
import React, { useState } from "react";
import { FooterBottomBar } from "../components/Footer";
import { TopSection } from "../components/TopSection";
import { GET_ALL_CATEGORIES, CREATE_USER_CATEGORIES, GET_USER_SELECTED_CATEGORIES } from "../utils/queries";
import { useForm } from "react-hook-form";
import { useSession, getSession } from "next-auth/client";
import { useQuery, useMutation } from "urql";
import Loader from "@components/Loader";
import { withUrqlClient, NextUrqlAppContext } from "next-urql";
import { dedupExchange, cacheExchange, fetchExchange } from "@urql/core";
import { useRouter } from "next/router";
import useProtectedRedirect from "../utils/hooks/useProtectedRedirect";
import Redirect from '@components/Redirect'

interface Props {}

const Preferences: React.FC<Props> = ({}) => {
  useProtectedRedirect("/login");
  const router = useRouter();

  const [session, sessionLoading] = useSession();
  const [{ data, error }] = useQuery({ query: GET_ALL_CATEGORIES });
  // redirect the user to the feed if the categories have already been selected
  const [{ data: selectedCategoriesData, error: selectedCategoriesError }] = useQuery({ query: GET_USER_SELECTED_CATEGORIES });
  if (selectedCategoriesData.UserOnCategories.length > 0) {
    return <Redirect to="/feed"/>
  }
  const [
    { fetching, error: mutationError, data: mutationResultData },
    createUserCategories,
  ] = useMutation(CREATE_USER_CATEGORIES);

  console.log({ querydata: data });

  const { register, handleSubmit, setValue } = useForm();
  const onSubmit = async (formData) => {
    console.log(formData);
    const mutationData = [];
    Object.keys(formData).forEach((el) => {
      if (formData[el]) {
        mutationData.push({
          category_id: formData[el],
          user_id: session.api["X-Hasura-User-Id"],
        });
      }
    });
    const mutationResult = await createUserCategories({ data: mutationData });
    console.log({ mutationResult });
    //redirect to the feed page
    router.push("/feed");
  };

  const userCategoriesObjects = {};
  data?.categories.forEach((el) => {
    if (el.user_category) {
      userCategoriesObjects[el.user_category.id] = el?.user_category;
    }
  });

  const filterByUserCategory = (category, userCategoryId) => {
    return (
      category.user_category && category.user_category.id === userCategoryId
    );
  };

  return (
    <section className="text-center bg-cold-gray-50">
      <TopSection noImage={true}>
        <h2 className="w-3/4 pt-40 pb-32 mx-auto text-3xl font-bold text-white lg:w-full">
          eWatergate wants to give you the best experience. Select user and
          technical categories to connect to the right audience
        </h2>
      </TopSection>

      <form onSubmit={handleSubmit(onSubmit)}>
        <SectionTitle text="Select User Categories" className="-mt-44" />
        <div className="flex flex-wrap justify-center space-x-4">
          {Object.values(userCategoriesObjects).map((userCategory: any, id) => (
            <CategoryList
              key={id}
              title={userCategory.name}
              categories={
                data?.categories?.filter((category) =>
                  filterByUserCategory(category, userCategory.id)
                ) || []
              }
              register={register}
              valueSetter={setValue}
            />
          ))}
        </div>
        <SectionTitle text="Select Technical Categories" className="" />
        <div className="flex justify-center space-x-4">
          <CategoryList
            title={"I am interested in all"}
            categories={
              data?.categories.filter((category) => !category.user_category) ||
              []
            }
            register={register}
            valueSetter={setValue}
          />
        </div>
        <button
          className="inline-flex px-4 py-2 my-8 space-x-2 text-base font-semibold text-white rounded bg-light-blue-900"
          type="submit"
        >
          <span>submit my choices</span>
          {fetching && (
            <span className="inline-block w-3 h-3">
              <Loader />
            </span>
          )}
        </button>

        <FooterBottomBar />
      </form>
    </section>
  );
};

interface CategoryListProps {
  title: string;
  categories: { name: string; id: string }[];
  register: any;
  valueSetter: any;
}

const CategoryList: React.FC<CategoryListProps> = ({
  title,
  categories,
  register,
  valueSetter,
}) => {
  const [allChecked, setAllChecked] = useState(false);
  const allCheckedHandler = (e) => {
    e.preventDefault();
    setAllChecked((old) => {
      const newChecked = !old;
      categories?.forEach((category) => {
        const value = newChecked ? category.id : false;
        valueSetter(category.name, value);
      });
      return newChecked;
    });
  };

  return (
    <div
      className="flex flex-col mt-4 space-y-4 text-white bg-white"
      style={{ minWidth: "216px" }}
    >
      <div
        onClick={allCheckedHandler}
        className="flex items-center px-4 py-2 space-x-1 text-white rounded cursor-pointer bg-light-blue-800"
      >
        <input
          type="checkbox"
          value={title}
          className="flex-none w-4 h-4 bg-white border-0 rounded-sm pointer-events-none text-light-blue-900 form-checkbox"
          checked={allChecked}
          onChange={allCheckedHandler}
        />
        <span className="text-base font-semibold">{title}</span>
      </div>
      {categories.map((el, i) => (
        <div
          key={i}
          className="flex items-center px-4 py-2 space-x-1 bg-white text-light-blue-900"
        >
          <input
            type="checkbox"
            name={el.name}
            ref={register}
            value={el.id}
            className="flex-none w-4 h-4 border-0 rounded-sm form-checkbox bg-light-blue-900 focus:ring-0 focus:ring-offset-0 text-light-blue-900"
          />
          <span className="text-sm text-light-blue-900">{el.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Preferences;
