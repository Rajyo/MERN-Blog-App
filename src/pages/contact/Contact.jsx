import { useForm } from "react-hook-form";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const toastifySuccess = () => {
    toast.success("Check your Mail", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: "submit-feedback success",
      toastId: "notifyToast",
      theme: "dark",
    });
  };


  const onSubmit = async (data) => {
    // Destrcture data object
    const { name, email, subject, message } = data;
    try {
      const templateParams = {
        user_name: name,
        user_email: email,
        user_subject: subject,
        user_message: message,
      };

      await emailjs.send(
        process.env.REACT_APP_SERVICE,
        process.env.REACT_APP_TEMPLATE,
        templateParams,
        process.env.REACT_APP_SECRET
      );

      reset();
      toastifySuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="">
      <h1
        style={{
          textAlign: "center",
          backgroundColor: "rgba(169, 112, 23, 0.82)",
          color: "white",
          padding: "10px",
          fontSize: "2rem"
        }}
      >
        Contact
      </h1>

      <div className="text-center -mt-10 mb-8">
        <form
          id="contact-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{ backgroundColor: "#d1b0ea24" }}
          className="w-[95%] min-[400px]:w-[90%] sm:w-[65%] md:w-[65%] lg:w-[55%] max-[400px]:p-4"
        >
          {/* Row 1 of form */}
          <div className="">
            <div className="" >
              <label style={{ float: "left" }}>Name:</label>
              <input
                type="text"
                name="name"
                placeholder="Ken Adams"
                {...register("name", {
                  required: {
                    value: true,
                    message: "Please enter your name",
                  },
                  maxLength: {
                    value: 30,
                    message: "Please use 30 characters or less",
                  },
                })}
                className="form-control formInput"
              ></input>
              {errors.name && (
                <span className="errorMessage">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className="">
              <label style={{ float: "left" }}>Email:</label>
              <input
                type="email"
                name="email"
                placeholder="kenadams@friends.com"
                {...register("email", {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                })}
                className="form-control formInput"
              ></input>
              {errors.email && (
                <span className="errorMessage">
                  Please enter a valid email address
                </span>
              )}
            </div>
          </div>
          {/* Row 2 of form */}
          <div className="">
            <div className="">
              <label style={{ float: "left" }}>Subject:</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter Subject"
                {...register("subject", {
                  required: {
                    value: true,
                    message: "Please enter a subject",
                  },
                  maxLength: {
                    value: 75,
                    message: "Subject cannot exceed 75 characters",
                  },
                })}
                className="form-control formInput"
              ></input>
              {errors.subject && (
                <span className="errorMessage">
                  {errors.subject.message}
                </span>
              )}
            </div>
          </div>
          {/* Row 3 of form */}
          <div className="">
            <div className="">
              <label style={{ float: "left" }}>Message:</label>
              <textarea
                rows={3}
                name="message"
                placeholder="Enter Message"
                {...register("message", {
                  required: true,
                })}
                className="form-control formInput"
              ></textarea>
              {errors.message && (
                <span className="errorMessage">
                  Please enter a message
                </span>
              )}
            </div>
          </div>
          <button
            className=""
            type="submit"
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "0.8rem",
              fontSize: "1rem",
              borderRadius: "5px",
              marginTop: "1rem",
            }}
          >
            Submit
          </button>
        </form>

        <ToastContainer />
      </div>

    </div>
  );
};

export default Contact;
