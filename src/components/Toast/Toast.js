const Toast = ({ message }) => {
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <div>
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
