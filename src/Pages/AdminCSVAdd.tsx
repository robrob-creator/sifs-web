import AdminSidebar from "../Components/Admin_Sidebar";
import { useCSVReader } from "react-papaparse";
import { usePapaParse } from "react-papaparse";
import React, { useEffect, useState, CSSProperties } from "react";
import { createCSVUser } from "../services/user";

const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: "20%",
  } as CSSProperties,
  acceptedFile: {
    border: "1px solid #ccc",
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "80%",
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: "0 20px",
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: "green",
  } as CSSProperties,
};

export default function AdminCSVAdd() {
  const { readString } = usePapaParse();
  const [file, setFile] = useState([]);
  const { CSVReader } = useCSVReader();
  var commonConfig = { delimiter: "," };
  const csvString = `Column 1,Column 2,Column 3,Column 4
  1-1,1-2,1-3,1-4
  2-1,2-2,2-3,2-4
  3-1,3-2,3-3,3-4
  4,5,6,7`;

  function convertTable(tableData) {
    const [header, ...rows] = tableData;
    var finalArr = [];
    for (var vals = 0; vals < rows.length; vals++) {
      var row = rows[vals];
      var tableObj = {};
      for (var key = 0; key < header.length; key++) {
        tableObj[header[key]] = row[key];
      }
      finalArr.push(tableObj);
    }
    return finalArr;
  }
  return (
    <>
      <AdminSidebar />
      <div className="container" style={{ height: "100vh" }}>
        <div className="con">
          <h3 className="t-sub">Students</h3>
          <form>
            <CSVReader
              header="false"
              onUploadAccepted={(results: any) => {
                setFile(convertTable(results.data));
              }}
            >
              {({
                getRootProps,
                acceptedFile,
                ProgressBar,
                getRemoveFileProps,
              }: any) => (
                <>
                  <div style={styles.csvReader}>
                    <button
                      type="button"
                      {...getRootProps()}
                      style={styles.browseFile}
                    >
                      Browse file
                    </button>
                    <div style={styles.acceptedFile}>
                      {acceptedFile && acceptedFile.name}
                    </div>
                    <button {...getRemoveFileProps()} style={styles.remove}>
                      Remove
                    </button>
                  </div>
                  <ProgressBar style={styles.progressBarBackgroundColor} />
                </>
              )}
            </CSVReader>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  marginInline: 2,
                  padding: 10,
                  width: 245,
                  borderRadius: 20,
                  borderColor: "#377dff",
                  backgroundColor: "#377dff",
                  color: "white",
                  fontWeight: 600,
                }}
                onClick={async (e) => {
                  e.preventDefault();
                  await createCSVUser(
                    file?.filter((item) => item?.firstName != null)
                  );
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
