"use client";
import { useRouter } from "next/navigation";
import styles from "./gallery.module.css";
import { IoArrowBack } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
import Filters from "@/app/components/filters/filter";
import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { getGalleryCall } from "@/app/api/educ-etablissement/repo";
import ProcessingLoader from "@/app/components/processing-loader";
import dayjs from "dayjs";
import { SlCalender } from "react-icons/sl";
import { CiClock2 } from "react-icons/ci";

const Gallery = () => {
  const navigate = useRouter();

  let [state, setState] = useState({
    imagesNamesData: [],
    imagesData: [],
    startDate: new Date(),
    endDate: new Date(),
  })
  const [isProcessing, setIsProcessing] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false)

  useEffect(() => {
    let data = localStorage.getItem("galleryImagesData");
    data = JSON.parse(data);
    setState(prevState => ({ ...prevState, startDate: new Date(data.start), endDate: new Date(data.end), imagesNamesData: data.imagesNameData }))
  }, [])

  useEffect(() => {
    if (state.imagesNamesData.length > 0) {
      for (let index = 0; index < state.imagesNamesData.length; index++) {
        const element = state.imagesNamesData[index];
        getImagesRecord([element.gr_photo_photo]);
      }
      // getImagesRecord()
    }
  }, [state.imagesNamesData])

  function getImagesRecord(image) {
    setIsProcessing(true);
    getGalleryCall(image, 1).then(({ data }) => {
      setIsProcessing(false);
      console.log("data", data);
      if (data.error_code == 0) {
        let object = {
          image: `data:image/jpeg;base64,${data.result[0]}`,
        };
        state.imagesData.push(object);
        setState(prevState => ({ ...prevState, imagesData: state.imagesData }))
      }

    }).catch(err => {
      console.log("err", err);
      setIsProcessing(false);
    })
  }

  return (
    <>
      <Filters
        startDate={state.startDate}
        endDate={state.endDate}
        showRestFilters={false}
      />
      <div className={styles.wrapper}>
        <div className={styles.backbox}>
          <div
            className={styles.backbutton}
            onClick={() => navigate.push("/dashboard")}
          >
            <IoArrowBack style={{ color: 'grey' }} />
          </div>
          <span>Gallery</span>
        </div>
        <div className={styles.location}>
          <span>Home</span>
          <IoIosArrowForward />
          <span>Gallery</span>
        </div>
        <div className={styles.gallery}>
          {state.imagesData.map((item, index) => (
            <div key={index} className={styles.galleryview}>
              <div
                style={{
                  backgroundImage: `url(${item.image})`,
                  width: "290px",
                  height: "290px",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
                className={styles.imagecontent}
              >
                {/* <h3>{item.name}</h3> */}
                <div className={styles.calandclock}>
                  <span><SlCalender /></span>
                  <span>{dayjs(state.startDate).format("DD-MM-YYYY")}</span>
                  <span><CiClock2 /></span>
                  <span>{dayjs(state.endDate).format("DD-MM-YYYY")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isProcessing && <ProcessingLoader />}
    </>
  );
};

export default Gallery;
