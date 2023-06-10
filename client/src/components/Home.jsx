import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "semantic-ui-react";
import Swal from "sweetalert2";
import { BASE_URL } from "../services/helper";
import Navbar from "./Navbar/Navbar";

function Home() {
  const [media, setMedia] = useState([]);
  let [ID, setID] = useState(null);

  const [favourite, setFavourite] = useState("");
  setID = (id) => {
    sessionStorage.setItem("ID", id);
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/api/v1/insights`).then(({ data }) => {
      setMedia(data.insights);
    });
  }, []);

  const onDelete = (id) => {
    axios.delete(`${BASE_URL}/api/v1/insight/${id}`).then(() => {
      window.location.reload();
    });
  };

  const confDelete = (id) => {
    Swal.fire({
      title: "Are you sure want delete this Insight ?",
      showDenyButton: true,

      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted Successfully", "", "success");
        onDelete(id);
      } else if (result.isDenied) {
        Swal.fire("Cancelled", "", "info");
      }
    });
  };

  useEffect(() => {
    setID(sessionStorage.getItem("ID"));
  });

  return (
    <div>
      <Navbar />
      <div >
        <h3>Results</h3>
        <Table celled>
            <Table.Header >
              <Table.Row style={{ textAlign: "center"}}>
                <Table.HeaderCell
                  style={{ backgroundColor: "black", color: "#ffffff" }}
                >
                  Website Url
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "black", color: "#ffffff" }}
                >
                  WordCount
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "black", color: "#ffffff" }}
                >
                  linkUrls
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "black", color: "#ffffff" }}
                >
                  mediaUrls
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "black", color: "#ffffff" }}
                >
                  Actions
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          <Table.Body>
            {Array.isArray(media)
              ? media.map((data) => {
                  return (
                    <Table.Row className="rows">
                      <Table.Cell>{data.url}</Table.Cell>
                      <Table.Cell>{data.count}</Table.Cell>
                      <Table.Cell>
                        {data.linkUrls.map((item) => {
                          return (
                            <div>
                              <a href={item}>{item}</a>
                              <br />
                            </div>
                          );
                        })}
                      </Table.Cell>
                      <Table.Cell textAlign="left">
                        {data.mediaUrls.map((item) => {
                          return (
                            <div>
                              <li>{item}</li>
                            </div>
                          );
                        })}
                      </Table.Cell>

                      <Table.Cell>
                        <span>
                          <Button
                            variant="primary"
                            type="submit"
                            style={{
                              backgroundColor: "#FF0000",
                              color: "#ffffff",
                              fontSize: 10,
                              borderColor: "#FFC300",
                            }}
                            onClick={() => confDelete(data._id)}
                          >
                            Remove
                          </Button>
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              : null}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default Home;
