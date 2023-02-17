import React, { useRef, useState } from "react";

import { selectStyles } from "@components/FeedContent";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import { Footer } from "@components/Footer";
import { FeedNavBar } from "@components/FeedNavBar";
import { TopBannerAd } from "@components/TopBannerAd";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "urql";
import { CREATE_MEDIA_ARTICLE, GET_USER_SELECTED_CATEGORIES } from "@queries";
import { uploadFile } from "@functions";
import { useSession } from "next-auth/client";
import { BallClipRotateMultiple } from "react-pure-loaders";
import Button from "@components/Button";
import Photograph from "@components/logos/Photograph";
import Input from "@components/Input";
import { motion } from "framer-motion";
import Select from "react-select";
import makeAnimated from "react-select/animated";

interface CreateArticleData {
  title: string;
  description: string;
  image?: string;
  content: any;
  categoryId: string;
  document?: string;
}

const animatedComponents = makeAnimated();

const Editor = dynamic(() => import("@components/Editor"), { ssr: false });

const WaterMediaAddPage: React.FC<{}> = () => {
  const [session, _] = useSession();

  const [editorValue, setEditorValue] = useState("");
  const { register, errors, handleSubmit, watch } = useForm();
  const editorRef = useRef(null);

  const [
    { data: userSelectedCategoriesContent, error: userSelectedCategoriesError },
    refetchUserSelectedCategories,
  ] = useQuery({ query: GET_USER_SELECTED_CATEGORIES });

  const [
    {
      data: createArticleData,
      fetching: createArticleLoading,
      error: createArticleError,
    },
    createArticle,
  ] = useMutation(CREATE_MEDIA_ARTICLE);
  const coverImage = watch("coverImage");
  const pdfDoc = watch("pdf")
  const [fileUploading, setfileUploading] = useState(false);
  const [articleCategory, setarticleCategory] = useState("");

  const handleCancel = (e) => {};

  const handleSelectedCategoryChange = (data) => {
    // console.log({categorydata: data, ref: selectRef})
  };

  const selectRef = useRef(null);

  const [editorDelta, seteditorDelta] = useState(null);

  const onSubmit = async (data) => {
    // we first upload the images if any
    let coverImagePath = "";
    let pdfPath = "";
    let filePath = "";
    if (data?.coverImage[0]) {
      setfileUploading(true);
      coverImagePath = await uploadFile(data?.coverImage[0]);
    }
    if(data?.pdf[0]){
      setfileUploading(true);
      pdfPath = await uploadFile(data?.pdf[0])
    }
    console.log({ selectRef });
    const reqData: CreateArticleData = {
      title: data?.title,
      description: data?.description,
      image: "",
      categoryId: selectRef?.current?.state?.value?.value,
      content: editorDelta,
      document: ""
    };
    if (pdfPath) reqData.document = pdfPath;
    if (coverImagePath) reqData.image = coverImagePath;

    console.log({
      createArticleData,
      createArticleLoading,
      createArticleError,
      reqData,
    });
    const result = await createArticle(reqData);
    console.log({ result, reqData });
    setfileUploading(false);
  };

  const inputs = [
    {
      type: "text",
      placeholder: "title",
      name: "title",
      validationOptions: {
        minLength: 3,
      },
    },
    {
      type: "text",
      placeholder: "description",
      name: "description",
      validationOptions: {
        minLength: 3,
      },
    },

    {
      type: "file",
      name: "coverImage",
      placeholder: "cover image",
      data: coverImage,
    },
    {
      type: "file",
      name: "pdf",
      placeholder: "document",
      data: coverImage,
    },

  ];

  const handleChange = (value, delta, source, editor) => {
    setEditorValue(value);
    const deltaData = editor.getContents();
    seteditorDelta(deltaData);
    console.log({ editorRef });
  };

  return (
    <main className="flex flex-col">
      {/* quill rich content editor */}
      <FeedNavBar />
      <TopBannerAd undefined />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative pl-56 mb-8 space-y-6 pr-52 2xl:px-32 xl:px-4"
      >
        <h2 className="py-2 text-lg font-bold capitalize text-light-blue-900">
          {" "}
          create article{" "}
        </h2>
        {fileUploading ? (
          <span className="absolute top-0 right-3">
            <BallClipRotateMultiple color="#2cbcfa" loading={true} />
          </span>
        ) : null}

        <div className="flex items-center pr-4 space-x-3 bg-transparent rounded">
          <span className="ml-auto text-sm text-light-blue-900"></span>
          <Select
            closeMenuOnSelect={false}
            ref={selectRef}
            components={animatedComponents}
            defaultValue={{
              label:
                userSelectedCategoriesContent?.UserOnCategories?.[0].category
                  ?.name,
              value:
                userSelectedCategoriesContent?.UserOnCategories?.[0].category
                  ?.id,
            }}
            isMulti={false}
            styles={selectStyles}
            onChange={handleSelectedCategoryChange}
            options={userSelectedCategoriesContent?.UserOnCategories.map(
              (el) => ({ label: el.category.name, value: el.category.id })
            )}
            placeholder="Choose category"
          />
        </div>

        {inputs
          .filter((el) => el.type !== "file")
          .map((el, id) => (
            <div className="" key={id}>
              <Input {...el} className="w-3/6" register={register} />
            </div>
          ))}

        {inputs
          .filter((el) => el.type === "file")
          .map((el, id) => (
            <React.Fragment key={id}>
              <div className="flex items-center cursor-pointer hover:opacity-80">
                <label
                  htmlFor={el.name}
                  className="flex items-center justify-start space-x-2 cursor-pointer hover:opacity-80"
                >
                  <Photograph className="w-10 h-10 text-light-blue-900 " />
                  <span className="text-sm text-cold-gray-500 ">
                    {el.placeholder}
                  </span>
                </label>
                <input
                  id={el.name}
                  className="hidden"
                  name={el.name}
                  ref={register}
                  disabled={false}
                  type="file"
                />
              </div>
              {el.data && el.data[0] && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.2, type: "linear" }}
                  className="h-40 border rounded border-light-blue-900"
                >
                  <img
                    className="object-contain w-full h-full"
                    src={window.URL.createObjectURL(el.data[0])}
                    alt={el.placeholder}
                  />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        <div className="flex items-center justify-end space-x-4">
          <Button inverted type="button" onClick={handleCancel}>
            cancel
          </Button>
          <Button
            disabled={fileUploading || createArticleLoading}
            loading={fileUploading || createArticleLoading}
            type="submit"
          >
            create
          </Button>
        </div>
      </form>

      <section className="pl-56 mb-8 pr-52 2xl:px-32 xl:px-4">
        <div className="bg-white rounded shadow">
          <Editor value={editorValue} onChangeValue={handleChange} />
        </div>
      </section>

      <Footer className="mt-auto" />
    </main>
  );
};

export default WaterMediaAddPage;
