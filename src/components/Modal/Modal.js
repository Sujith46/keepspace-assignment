const Modal = ({ onDelete }) => {
  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold text-red-500">
            Are you sure you want to delete this contact ?
          </h3>
          <p className="py-4 mb-8">
            Please note, deleting this contact will permenently remove all your
            contact info from our database.
          </p>
          <div className="actions text-right">
            <label htmlFor="my-modal-4" className="btn btn-ghost mr-4">
              Cancel
            </label>
            <button className="btn" onClick={onDelete}>
              <span className="mr-2">🗑</span> Delete Now
            </button>
          </div>
        </label>
      </label>
    </>
  );
};

export default Modal;
