import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Layout from "@/components/Layout/Layout";
import RadioBtn from "@/components/RadioBtn/RadioBtn";
import TextInput from "@/components/TextInput/TextInput";

import { generateID } from "@/helpers/generateRandomID";
import { addContact } from "@/redux/slice/contactSlice";
import Toast from "@/components/Toast/Toast";

export default function AddContact() {
  const contact = useSelector((state) => state.contactSlice.contactData);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [toast, showToast] = useState(false);
  const [formData, setFormData] = useState({
    id: generateID(2),
    name: "",
    email: "",
    phone: "",
    gender: "M",
    nationality: "",
    dob: "",
    img: "",
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioButton = (e, gender) => {
    const name = e.target.name;

    if (gender === "M") {
      setFormData({
        ...formData,
        [name]: "M",
      });
    } else {
      setFormData({
        ...formData,
        [name]: "F",
      });
    }
  };

  const handleFormInputSumbit = () => {
    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (formData?.name === "") {
      setError("Name should not be empty");
    } else if (formData?.email === "") {
      setError("Email should not be empty");
    } else if (!formData?.email?.match(isValidEmail)) {
      setError("Email should be in correct format");
    } else {
      setError("");
      const newContactData = [formData, ...contact];
      dispatch(addContact(newContactData));
      showToast(true);
      setTimeout(() => {
        showToast(false);
      }, 4000);
    }
  };

  return (
    <Layout>
      <div className="p-12 ">
        <div className="header mb-8">
          <h2 className="text-3xl font-bold mb-1">
            <span>✏️</span> New Contact
          </h2>
          <p className="opacity-50">
            This section lets you add new contacts to your contact list
          </p>
        </div>
        <div className="add-contact-form mb-8">
          <div className="row-one grid grid-cols-2 gap-8 mb-8">
            <TextInput
              label="Name *"
              name="name"
              onChange={handleInputChange}
            />
            <TextInput
              label="Email address *"
              type="email"
              name="email"
              onChange={handleInputChange}
            />
          </div>
          <div className="row-one grid grid-cols-2 gap-8 mb-8">
            <TextInput
              label="Phone number"
              name="phone"
              onChange={handleInputChange}
            />
            <TextInput
              label="Nationality"
              name="nationality"
              onChange={handleInputChange}
            />
          </div>
          <div className="row-one grid grid-cols-2 gap-8 mb-8">
            <TextInput
              label="Date of birth"
              type="date"
              name="dob"
              onChange={handleInputChange}
            />
          </div>
          <div className="row-one items-center w-32 flex gap-10">
            <RadioBtn
              label="Male"
              name="gender"
              checked={formData?.gender === "M"}
              onChange={(e) => handleRadioButton(e, "M")}
            />
            <RadioBtn
              label="Female"
              name="gender"
              checked={formData?.gender === "F"}
              onChange={(e) => handleRadioButton(e, "F")}
            />
          </div>
        </div>
        <div className="flex items-center justify-end gap-4">
          {error ? <div className="error text-red-500">{error}</div> : ""}
          <button
            className="btn btn-secondary"
            onClick={() => handleFormInputSumbit()}
          >
            <span className="mr-2">👍🏼</span>Add Contact
          </button>
        </div>
      </div>
      {toast ? <Toast message="🥳 Contact successfully saved!" /> : null}
    </Layout>
  );
}
