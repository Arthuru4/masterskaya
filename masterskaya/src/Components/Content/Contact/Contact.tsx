import React from "react";
import s from "./Contact.module.scss";
import Form from "../../ContactForm/Form";

const Contact = () => {

  return (
    <div className={s.Contact}>
      <Form></Form>
    </div>
  );
};

export default Contact;
