import React from "react"
import { Formik } from 'formik';
import * as anchor from "@project-serum/anchor"
import {addWindowAPI} from "../../utils/addWindowAPI"
const SubmitMintForm =  (props:any) => {


    return(
      <Formik
      initialValues={{ mint: ''}}
      validate={values => {
        const errors = {};
        if (!values.mint) {
          //@ts-ignore
          errors.mint = 'Required';
        } 
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let tokenMintPubkey = new anchor.web3.PublicKey(values.mint);
        
          addWindowAPI(props.wallet,props.connection,props.program,tokenMintPubkey, props.musicFile, props.imageFile  )
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="mint"
            name="mint"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.mint}
          />
        
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
    )
}

export default SubmitMintForm