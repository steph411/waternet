import { SocialLogin } from "./SocialLogin";
import React, { useState } from "react";
import Logo from "./logos/Logo";
import Facebook from "./logos/Facebook";
import Google from "./logos/Google";
import Input from "./Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import Select from "react-select";
import countriesData from "../countries.json";

export enum LoginType {
  login = "LOGIN",
  signup = "SIGNUP",
  signin = "SIGNIN",
}

interface Props {
  className?: string;
  type?: LoginType;
}

const siteUrl = process.env.NEXT_PUBLIC_URL;

export const LoginForm: React.FC<Props> = ({
  className,
  type = LoginType.signin,
}) => {
  const inputs = [
    {
      type: "text",
      placeholder: "First name",
      name: "firstname",
      validationOptions: {
        minLength: 3,
      },
    },
    {
      type: "text",
      placeholder: "Last name",
      name: "lastname",
      validationOptions: {
        minLength: 3,
      },
    },
    {
      type: "text",
      placeholder: "Country",
      name: "country",
      validationOptions: {
        // validate to see if the user entered a valid country name
        validate: () => true,
      },
    },
    {
      type: "text",
      placeholder: "City",
      name: "city",
      validationOptions: {
        // validate to see if the user entered a valid city name
        validate: () => true,
      },
    },
    {
      type: "email",
      placeholder: "Email",
      className: "col-span-2",
      name: "email",
      validationOptions: {
        // validate to see if the user entered a valid city name
        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      },
    },
    {
      type: "password",
      placeholder: "Password",
      className: "col-span-2",
      name: "password",
      validationOptions: {
        minLength: 8,
      },
    },
  ];

  const socialLogins = [
    {
      name: "Facebook Login",
      Logo: Facebook,
      onClick: () => socialLogin("facebook"),
    },
    {
      name: "Google Login",
      Logo: Google,
      onClick: () => socialLogin("google"),
    },
  ];

  const { errors, handleSubmit, register } = useForm();

  const countrySelectRef = React.useRef(null);
  const citySelectRef = React.useRef(null);

  const countries = Object.keys(countriesData);

  const [selectedCountry, setSelectedCountry] = useState("Cameroon");
  const [selectedCity, setSelectedCity] = useState(
    countriesData[selectedCountry][0]
  );
  const [cities, setCities] = useState(countriesData[selectedCountry]);

  const selectData = {
    country: {
      data: countries,
      default: selectedCountry,
      ref: countrySelectRef,
      operation: (data) => {
        if (data) {
          console.log({ data });
          setSelectedCountry(data?.value);
          setSelectedCity((old) => countriesData[data?.value][0]);
          console.log({ selectedCity });
          setCities(countriesData[data?.value]);
          citySelectRef.current.state.inputValue =
            countriesData[data?.value][0];
          citySelectRef.current.select.focus();
        } else {
          citySelectRef.current.select.clearValue();
        }
      },
    },
    city: {
      data: cities,
      default: selectedCity,
      ref: citySelectRef,
      operation: (data) => {
        if (data) {
          console.log({ data });
          setSelectedCity(data?.value);
        }
      },
    },
  };

  const router = useRouter();

  const login = async (data) => {
    console.log({ loginData: data, errors: errors });
    const provider =
      type === LoginType.login ? "credentials-login" : "credentials-signup";
    data.country = selectedCountry;
    data.city = selectedCity;
    await signIn(provider, { ...data, callbackUrl: `${siteUrl}/preferences` });
    router.replace("/");
    console.log({ signedinsuccessfully: true });
    console.warn("Logged in successfully");
  };

  const socialLogin = async (provider: string) => {
    await signIn(provider, { callbackUrl: `${siteUrl}/preferences` });
    console.log({ signedinsuccessfully: true });
    router.replace("/");
  };

  const selectStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      border: "none",
      boxShadow:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);",
      fontSize: "0.875rem",
      lineHeight: "1.25rem",
      color: "rgba(51, 65, 85, 1)",
      ":focus-within": {
        "--tw-ring-offset-shadow":
          "var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);",
        "--tw-ring-shadow":
          "var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) rgba(44, 188, 250, 1);",
        "box-shadow":
          "var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);",
      },
    }),
    option: (styles) => ({
      ...styles,
      color: "rgba(51, 65, 85, 1)",
      ":hover": {
        ...styles[":active"],
        backgroundColor: "rgba(44, 188, 250, 0.8)",
      },
      ":active": {
        ...styles[":active"],
        backgroundColor: "rgba(44, 188, 250, 1)",
      },
    }),
    input: (styles) => ({
      ...styles,
      color: "rgba(51, 65, 85, 1)",
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "rgba(51, 65, 85, 0.4)",
    }),
  };

  return (
    <div
      className={
        "w-1/2 px-6 py-8 text-center bg-white shadow-md md:w-full lg:w-1/2 " +
        className
      }
    >
      <div className="flex justify-center">
        <img src="/logo_ewater_2.png" className="w-64" />
      </div>
      <h3 className="py-4 text-lg font-semibold text-center text-light-blue-500">
        Join the community of successful water and environmental professionals
      </h3>
      <form
        action=""
        onSubmit={handleSubmit(login, console.log)}
        className="grid w-full grid-cols-2 gap-x-3 gap-y-5"
      >
        {inputs
          .filter((el) => {
            if (type == LoginType.login) {
              return ["email", "password"].includes(el.type);
            }
            return true;
          })
          .map((el, index) => (
            <div key={index} className={el.className}>
              {el.name === "city" || el.name === "country" ? (
                <Select
                  isClearable={true}
                  defaultInputValue={selectData[el.name].default}
                  placeholder={el.name}
                  styles={selectStyles}
                  ref={selectData[el.name].ref}
                  onChange={selectData[el.name].operation}
                  options={selectData[el.name].data.map((data) => ({
                    label: data,
                    value: data,
                  }))}
                />
              ) : (
                <Input {...el} key={index} register={register} />
              )}
              {/* <span className={"text-xs text-red-400 text-left inline-block w-full"}>{ errors[el.name] &&  "error message"}</span> */}
            </div>
          ))}

        <p className="col-span-2 p-4 text-xs text-center text-light-blue-800">
          By clicking Sign Up, you agree to the{" "}
          <span className="font-semibold text-light-blue-900">
            Terms, Data Policy
          </span>{" "}
          and{" "}
          <span className="font-semibold text-cold-gray-800">
            Cookies Policy
          </span>{" "}
          of eWaterGate.
        </p>

        <button
          type="submit"
          className="col-span-2 p-2 text-base text-white transition rounded bg-light-blue-900 hover:bg-light-blue-800"
        >
          {type === LoginType.login ? "Login" : "Sign up"}
        </button>

        <p className="col-span-2 text-base font-bold text-center text-light-blue-900">
          {type === LoginType.login ? "Forgot password?" : "OR"}
        </p>
        {socialLogins.map((el, index) => (
          <SocialLogin {...el} key={index} />
        ))}
        <Link href={type === LoginType.login ? "/signup" : "/login"}>
          <a
            className="col-span-2 text-lg font-bold transition text-light-blue-900 hover:text-light-blue-800"
            href=""
          >
            {type === LoginType.login
              ? "New to eWaterGate? Sign Up"
              : "Already on eWaterGate? Login"}
          </a>
        </Link>
      </form>
    </div>
  );
};
