import Image from "next/image";
import { useRouter } from "next/router";

import DefaultAvatar from "../../assets/images/avatar/defaultAvatar.jpg";

const Card = ({ name, gender, nationality, email, dob, img, phone, id }) => {
  const router = useRouter();

  const handleRoute = (url) => {
    router.push(`/${url}`);
  };
  return (
    <div className="card bg-base-100 shadow-md w-full">
      <div className="card-body gap-6">
        <div className="card-header flex gap-8 content-center mb-4">
          <div className="avatar">
            <div className="w-20 rounded-full">
              {img ? (
                <Image src={img} alt="avatar" />
              ) : (
                <Image src={DefaultAvatar} alt="avatar" />
              )}
            </div>
          </div>
          <div className="content">
            <div className="name-wrapper flex items-center">
              <h2 className="card-title mb-2">{name}</h2>
              {gender && (
                <div className="gender flex mb-2 items-center justify-center text-xs ml-2 bg-red-300 p-2 text-white rounded-2xl w-5 h-5">
                  {gender}
                </div>
              )}
            </div>
            {dob && (
              <div className="dob text-sm mb-1">
                <span>🎂</span> {dob}
              </div>
            )}
            {nationality && (
              <div className="nationality text-sm">
                <span>🌍</span> {nationality}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <div className=" items-center gap-4 mb-4">
            <div className="phone text-sm font-bold mb-2">
              <span>📞</span> {phone}
            </div>
            <div className="email text-sm font-bold">
              <span>✉️</span> {email}
            </div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={() => handleRoute(id)}>
              View ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
