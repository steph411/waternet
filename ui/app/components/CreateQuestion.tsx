import React from "react";
import QuestionMark from "@components/logos/QuestionMark";
import Select from "react-select";
import { selectStyles } from "@components/FeedContent";
import makeAnimated from "react-select/animated";
import Input from "@components/Input";
import Button from "@components/Button";
import { useForm } from "react-hook-form";
import { CREATE_QUESTION } from "@queries";
import { useMutation } from "urql";

interface Props {
  className?: string;
  categories: any[];
  onCreate?: Function;
}

const animatedComponents = makeAnimated();

const CreateQuestion: React.FC<Props> = ({
  className,
  categories,
  onCreate,
}) => {
  const [text, setText] = React.useState("");
  const [hideIdentityChecked, sethideIdentityChecked] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const textRef = React.useRef(null);
  const identityCheckedRef = React.useRef(null);
  const { register, handleSubmit, watch, reset } = useForm();

  const [
    {
      data: createQuestionData,
      error: createQuestionError,
      fetching: createQuestionFetching,
    },
    createQuestion,
  ] = useMutation(CREATE_QUESTION);

  const hanldeHideIdentityChange = (e) => {
    e.preventDefault();
    console.log({ hideindentitchanging: hideIdentityChecked });
    sethideIdentityChecked((old) => !old);
  };

  const handleQuestionCategoryChange = (data) => {
    console.log({ data });
    setSelectedCategory(data.value);
  };

  const onSubmit = async (data) => {
    console.log({ creatingquestion: data });
    const result = await createQuestion({
      categoryId: selectedCategory,
      topic: data.topic,
      content: data.content,
    });
    console.log({ result, creatingquestion: data });
    reset();
    onCreate();
  };

  return (
    <section
      className={" flex px-6 py-4 bg-light-blue-100 rounded " + className}
    >
      <div className="self-start flex-none">
        <QuestionMark className="w-12 h-12 text-light-blue-900 " />
      </div>
      <div className="flex-1">
        <div className="w-full p-3 space-y-4">
          <div className="rounded bg-light-blue-50 focus-within:ring-2 ring-1 ring-light-blue-900">
            <Select
              closeMenuOnSelect={true}
              components={animatedComponents}
              defaultValue={[]}
              isMulti={false}
              styles={selectStyles}
              onChange={handleQuestionCategoryChange}
              options={categories}
              // options={userSelectedCategoriesContent?.UserOnCategories.map(el => ({label: el.category.name, value: el.category.id}))}
              placeholder="Select water category"
            />
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              name="topic"
              type="text"
              register={register}
              className="ring-1 bg-light-blue-50 ring-light-blue-900"
              placeholder="Enter your topic"
            />

            <textarea
              value={text}
              rows={3}
              ref={register}
              name="content"
              onChange={(e) => setText(e.target.value)}
              className={
                "w-full py-2 text-sm placeholder-bold bg-light-blue-50 rounded shadow resize-none placeholder-underline ring-1 focus:ring-2 ring-light-blue-900 form-textarea placeholder-light-blue-900 placeholder-opcacity-100 text-light-blue-900"
              }
              placeholder={
                "ask a question on water and sanitation and get answers from experts"
              }
            ></textarea>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 ">
                <input
                  type="checkbox"
                  className="flex-none w-4 h-4 bg-white border-0 rounded-sm text-light-blue-900 form-checkbox"
                  id="hideidentity"
                  ref={identityCheckedRef}
                  // checked={hideIdentityChecked}
                  // onChange={hanldeHideIdentityChange}
                  // onClick={hanldeHideIdentityChange}
                />
                <label
                  htmlFor="hideidentity"
                  className="text-sm text-light-blue-700"
                >
                  Hide my identity
                </label>
              </div>
              <Button type="submit" loading={createQuestionFetching}>
                Ask Now
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateQuestion;
