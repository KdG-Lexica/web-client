import React, { useRef, useState } from "react";
import { useMutation } from "react-query";
import * as documentApi from "../../api/DocumentApi";

const ModelEditor = () => {
    const textarea = useRef<any>();
    const [succes, setSucces] = useState(false);

    const { mutate, isLoading } = useMutation(documentApi.createModel, {
        onSuccess: (data: any) => {     
            setSucces(true);
        },
        onError: (error: any) => {
          console.log(error);
        }
      });

      function send() {
          mutate(textarea.current.value);
      }

      if(succes) {
          return (
            <div>
                SUCCCES
            </div>
          );

      }

      if(isLoading) {
          return(
              <div>
                  CREATING YOUR DATASET, THIS MIGHT TAKE A WHILE
              </div>
          )
      }

    return (
      <div style={{position: "absolute", height: "100vh", width: "100vw", display: "flex"}}>
          <div style={{height: "100%", width: "50%"}}>
              <textarea style={{height: "100%", width: "100%"}} ref={textarea} name="model" id="model">

              </textarea>
          </div>
          <div style={{height: "100%", width: "50%"}}>
              <button style={{background: "red"}} onClick={send}>CREATE MODEL</button>
          </div>
      </div>
    )
}

export default ModelEditor;