import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import Layout from "@/components/Layout/Layout";
import RadioBtn from "@/components/RadioBtn/RadioBtn";
import TextInput from "@/components/TextInput/TextInput";

import { addContact } from "@/redux/slice/contactSlice";
import Toast from "@/components/Toast/Toast";
import Modal from "@/components/Modal/Modal";

export default function DetailedContactView({ contactId }) {
  const contact = useSelector((state) => state.contactSlice.contactData);
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchCurrentContact = contact?.filter(
    (item) => item?.id === contactId
  )?.[0];

  const [error, setError] = useState("");
  const [toast, showToast] = useState(false);
  const [deletedToast, setDeletedToast] = useState(false);

  const [formData, setFormData] = useState({
    id: contactId,
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
      const newContactData = [...contact, formData];
      dispatch(addContact(newContactData));
      showToast(true);
      setTimeout(() => {
        showToast(false);
      }, 4000);
    }
  };

  const handleDeleteContact = () => {
    const newContactList = contact?.filter((item) => item?.id !== contactId);
    if (newContactList?.length > 0) {
      dispatch(addContact(newContactList));
      setDeletedToast(true);
      setTimeout(() => {
        setDeletedToast(false);
        router.push("/");
      }, 500);
    }
  };

  useEffect(() => {
    setFormData({ ...fetchCurrentContact });
  }, [contactId]);

  return (
    <Layout>
      <div className="p-12 ">
        <div className="header mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-1">
              <span>🛠</span> Update Contact
            </h2>
            <p className="opacity-50">
              This section lets you update the selected contact
            </p>
          </div>
          <label htmlFor="my-modal-4" className="btn btn-ghost text-red-500">
            <span className="mr-2">🗑</span> DELETE CONTACT
          </label>
        </div>
        <div className="add-contact-form mb-8">
          <div className="row-one grid grid-cols-3 gap-8 mb-8">
            <TextInput
              label="Name *"
              name="name"
              defaultValue={formData?.name}
              onChange={handleInputChange}
            />
            <TextInput
              label="Email address *"
              type="email"
              name="email"
              defaultValue={formData?.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="row-one grid grid-cols-3 gap-8 mb-8">
            <TextInput
              label="Phone number"
              name="phone"
              defaultValue={formData?.phone}
              onChange={handleInputChange}
            />
            <TextInput
              label="Nationality"
              name="nationality"
              defaultValue={formData?.nationality}
              onChange={handleInputChange}
            />
          </div>
          <div className="row-one grid grid-cols-3 gap-8 mb-8">
            <TextInput
              label="Date of birth"
              type="date"
              name="dob"
              defaultValue={formData?.dob}
              onChange={handleInputChange}
            />
          </div>
          <div className="row-one w-32">
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
        <div className="flex items-center gap-4">
          <button
            className="btn btn-primary"
            onClick={() => handleFormInputSumbit()}
          >
            <span className="mr-2">📤</span>Update Contact
          </button>
          {error ? <div className="error text-red-500">{error}</div> : ""}
        </div>
      </div>
      <Modal onDelete={handleDeleteContact} />
      {toast ? <Toast message="🥳 Contact successfully updated!" /> : null}
      {deletedToast ? (
        <Toast message="😢 Contact successfully deleted!" />
      ) : null}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const fetchId = context?.params?.index;
  return {
    props: {
      contactId: Number(fetchId),
    },
  };
}
