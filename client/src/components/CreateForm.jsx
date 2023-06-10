import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import Swal from "sweetalert2";
import "./style.css";
import { BASE_URL } from "../services/helper";

function CreateForm() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");

  const sendDataToApi = () => {
    axios
      .post(`${BASE_URL}/api/v1/create?url=${url}`, {
        url,
      })
      .then(() => {
        Swal.fire("Insights fetched Successfully!", "", "success");
        navigate("/home");
      });
  };
  return (
    <div>
      <div className="form">
        <Form className="myForm">
          <h3 style={{ marginBottom: "40px", fontSize: "50px" }}>
            Webpage Scraper
          </h3>
          <Form.Field>
            <input
              name="url"
              placeholder="Enter Website Url"
              onChange={(e) => setUrl(e.target.value)}
              style={{ textAlign: "center", width: "300px" }}
              type="url"
            />
          </Form.Field>
          <Button
            style={{
              backgroundColor: "blue",
              color: "#ffffff",
              fontSize: 12,
            }}
            type="submit"
            onClick={sendDataToApi}
            className="Button"
          >
            Get Insights
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default CreateForm;
