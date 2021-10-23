// @refresh reset

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form } from "formik";
import * as yup from "yup";
import styles from "../pages/styles/Modal.module.css";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { delay: 0.2 },
  },
};

/* Todo (kelvin): replace type def with prop types */
// type ModalProps = {
//   showModal: boolean;
//   setShowModal: (show: boolean) => void;
// };

const Modal = ({ showModal, setShowModal }) => {
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (window.location.search.includes("success=true")) {
      setSuccess(true);
    }
  }, []);
  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
    subject: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
      .required("Please enter a subject"),
    message: yup.string().required("Please enter a message"),
  });
  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  //   const onSubmit = async (values) => {};
  //   const onSubmit = (values, actions) => {
  //     fetch("/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //       body: encode({ "form-name": "contact", ...values }),
  //     })
  //       .then(() => {
  //         alert("Success");
  //         actions.resetForm();
  //       })
  //       .catch(() => {
  //         alert("Error");
  //       })
  //       .finally(() => actions.setSubmitting(false));
  //   };
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className={styles.backdrop}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div className={styles.modal} variants={modal}>
            <div onClick={() => setShowModal(false)} className={styles.icon}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.1514 9.50024L18.3257 3.32587C18.6737 2.97351 18.8681 2.49782 18.8665 2.00264C18.8649 1.50746 18.6675 1.03301 18.3174 0.682875C17.9672 0.332736 17.4927 0.135346 16.9976 0.133798C16.5024 0.132251 16.0267 0.326672 15.6744 0.674616L9.49999 6.84888L3.32562 0.674616C2.97295 0.328283 2.49779 0.135234 2.00351 0.137473C1.50923 0.139711 1.03583 0.337055 0.686321 0.686568C0.336809 1.03608 0.139465 1.50948 0.137226 2.00376C0.134988 2.49804 0.328037 2.9732 0.674369 3.32587L6.84863 9.50024L0.674369 15.6746C0.328037 16.0273 0.134988 16.5024 0.137226 16.9967C0.139465 17.491 0.336809 17.9644 0.686321 18.3139C1.03583 18.6634 1.50923 18.8608 2.00351 18.863C2.49779 18.8652 2.97295 18.6722 3.32562 18.3259L9.49999 12.1516L15.6744 18.326C16.0267 18.6739 16.5024 18.8683 16.9976 18.8667C17.4928 18.8652 17.9672 18.6678 18.3174 18.3176C18.6675 17.9675 18.8649 17.493 18.8664 16.9978C18.868 16.5026 18.6736 16.027 18.3256 15.6746L12.1514 9.50024Z"
                  fill="#374B58"
                />
              </svg>
            </div>

            <h1>Send Us A Message</h1>

            <Formik
              validationSchema={loginSchema}
              initialValues={{
                email: "",
                subject: "",
                message: "",
              }}
              onSubmit={(values, actions) => {
                fetch("/", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                  body: encode({ "form-name": "contact", ...values }),
                })
                  .then(() => {
                    alert("Success");
                    actions.resetForm();
                  })
                  .catch(() => {
                    alert("Error");
                  })
                  .finally(() => actions.setSubmitting(false));
              }}
              validateOnChange={true}
              validateOnBlur={true}
              validateOnMount={true}
            >
              {({
                handleChange,
                handleBlur,
                touched,
                errors,
                values,
                isValid,
              }) => (
                <Form
                  name="contact"
                  //   method="POST"
                  //   action="/?success=true"
                  data-netlify={true}
                >
                  <input type="hidden" name="form-name" value="contact" />
                  <div className={styles.wrapper}>
                    <div>
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        name="email"
                        className={[
                          styles.input,
                          touched.email && errors.email ? styles.error : "",
                        ].join(" ")}
                        placeholder="Enter your email address"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      ></input>
                      <p className={styles.errorMessage}>
                        {touched.email && errors.email}
                      </p>
                    </div>

                    <div>
                      <label htmlFor="subject">Subject</label>
                      <input
                        className={[
                          styles.input,
                          touched.email && errors.email ? styles.error : "",
                        ].join(" ")}
                        id="subject"
                        name="subject"
                        placeholder="Enter your subject"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.subject}
                      ></input>
                      {/* <p className={styles.errorMessage}>
                        {touched.subject && errors.subject}
                      </p> */}
                    </div>
                    <div>
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        className={[
                          styles.input,
                          styles.message,
                          touched.email && errors.email ? styles.error : "",
                        ].join(" ")}
                        placeholder="Enter your message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.message}
                      ></textarea>
                      {/* <p className={styles.errorMessage}>
                        {touched.message && errors.message}
                      </p> */}
                    </div>
                    {/* <div>
                      <div data-netlify-recaptcha="true"> </div>
                    </div> */}
                    <button type="submit">Submit</button>
                  </div>
                </Form>
              )}
            </Formik>
          </motion.div>
          )
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default Modal;
