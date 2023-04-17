import Layout from "@/components/Layout/Layout";
import Card from "@/components/ContactCard/ContactCard";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import { addContact } from "@/redux/slice/contactSlice";

import Spinner from "@/components/Spinner/Spinner";

export default function Home() {
  const contact = useSelector((state) => state.contactSlice.contactData);
  const dispatch = useDispatch();

  const [contactDataSource, setContactDataSource] = useState(9);
  const [hasMore, setHasMore] = useState(true);

  // const fetchContactDetails = async () => {
  //   const getData = await axios("/api/contacts");
  //   const data = await getData?.data;

  //   if (data && data?.length > 0) {
  //     dispatch(addContact(data));
  //   }
  // };

  const fetchMoreContacts = () => {
    if (contactDataSource >= contact?.length) {
      setHasMore(false);
    }
    setTimeout(() => {
      setContactDataSource(contactDataSource + 6);
    }, 1000);
  };

  useEffect(() => {
    dispatch(addContact(contact));
  }, [contact]);

  return (
    <div className="main">
      <Layout>
        <div className="home-header pl-12 pr-12 pt-8 pb-8 flex justify-between">
          <div className="header-content">
            <h1 className="text-2xl font-bold mb-2">👋🏼 Hey, Welcome back!</h1>
            <p className="text-gray-400">
              ** This section displays all your saved contacts **
            </p>
          </div>
          <div className="filter">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost rounded-btn">
                Select Filters <span className="ml-2">⬇️</span>
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
              >
                <li>
                  <a>Name</a>
                </li>
                <li>
                  <a>Gender</a>
                </li>
                <li>
                  <a>Nationality</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <InfiniteScroll
          dataLength={contactDataSource}
          next={fetchMoreContacts}
          hasMore={hasMore}
          loader={
            <>
              <div></div>
              <div className="grid-col-2 flex justify-center">
                <Spinner />
              </div>
            </>
          }
          className="contacts p-12 grid grid-cols-3 gap-10"
        >
          {contact &&
            contact
              ?.slice(0, contactDataSource)
              ?.map((item, index) => (
                <Card
                  key={index}
                  id={item?.id}
                  name={item?.name}
                  email={item?.email}
                  phone={item?.phone}
                  nationality={item?.nationality}
                  img={item?.img}
                  dob={item?.dob}
                  gender={item?.gender}
                />
              ))}
        </InfiniteScroll>
      </Layout>
    </div>
  );
}
