import React, { useState } from "react";
import styles from "./css/main.module.css";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiBookshelf } from "react-icons/gi";
import { FaAddressBook } from "react-icons/fa";
import { GrBike } from "react-icons/gr";
import { BiLibrary } from "react-icons/bi";
import peppa from "./images/peppa.jpg";

const Modal = ({ visibility, total, image, setVisibility }) => {
  const [displayAdd, setDisplayAdd] = useState(false);

  const handleAdd = () => {
    setDisplayAdd(true);
  };

  const handleSkip = () => {
    setVisibility(!visibility);
  };

  const getNumber = () => {
    return image.map((val) => {
      if (val.selected) {
        return val.no + ", ";
      } else {
        return "";
      }
    });
  };

  return (
    <dialog id="dialogBox" className={styles.modal} open={visibility}>
      <div className={styles.modalFlex}>
        <h3 style={{ fontWeight: "bold" }}>
          {" "}
          View Suggestions - Selected Books{" "}
        </h3>
        <p>{total} Books Selected.</p>
        <div className={styles.isbnHolder}>
          <div> ISBN Numbers </div>
          <div className={styles.noDiv}>{getNumber()}</div>
          {displayAdd ? (
            <div className={styles.dbFetch}>
              {" "}
              User Not Found &#123;{total}&#125; <div>{getNumber()}</div>
            </div>
          ) : (
            ""
          )}
        </div>
        <button onClick={handleAdd} className={styles.addButton}>
          {" "}
          Add{" "}
        </button>
        <button onClick={handleSkip} className={styles.skipButton}>
          {" "}
          Skip{" "}
        </button>
      </div>
    </dialog>
  );
};

const Main = () => {
  const [total, setTotal] = useState(0);
  const [visibility, setVisibility] = useState(false);
  const handleSelection = (id) => {
    setImage((prev) => {
      return prev.map((val) => {
        if (val.id === id) {
          if (val.selected) {
            setTotal((prev) => prev - 1);
            return { ...val, selected: false };
          } else {
            setTotal((prev) => prev + 1);
            return { ...val, selected: true };
          }
        } else {
          return val;
        }
      });
    });
  };

  const imageObjects = Array.from(
    { length: (15 - 1) / 1 + 1 },
    (value, index) => 1 + index * 1
  ).map((value, index) => {
    let temp = 110087;
    temp += index;
    return {
      id: value,
      image: peppa,
      selected: false,
      no: temp,
    };
  });

  const [image, setImage] = useState(imageObjects);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.innerFlex}>
          <div className={styles.iconFlex}>
            <BsFillPeopleFill />
            <GiBookshelf />
            <FaAddressBook />
            <GrBike />
            <BiLibrary />
          </div>
          <div className={styles.infoFlex}>
            <p> Customer Details </p>
            <p> Book Log </p>
            <p> Add Suggestion (Book) </p>
            <p> Delivery </p>
            <p> Our Library </p>
          </div>
        </div>
      </div>
      <div className={visibility ? styles.addSuggestion : styles.grayBack}>
        <div>
          <div className={styles.yearsContent}>
            <div className={styles.zero}>
              <h2> 0-2 </h2>
              <p>Years</p>
            </div>
            <div className={styles.one}>
              <h2> 3-5 </h2>
              <p>Years</p>
            </div>
            <div className={styles.two}>
              <h2> 6-8 </h2>
              <p>Years</p>
            </div>
            <div className={styles.three}>
              <h2> 9-11 </h2>
              <p>Years</p>
            </div>
            <div className={styles.four}>
              <h2> 12-14 </h2>
              <p>Years</p>
            </div>
            <div className={styles.five}>
              <h2> 15+ </h2>
              <p>Years</p>
            </div>
          </div>
          <div className={styles.options}>
            <select className={styles.dropDown}>
              <option> Filter </option>
            </select>
            <button
              onClick={() => setVisibility(!visibility)}
              className={visibility ? styles.openEye : styles.closedEye}
            >
              View Suggestions
            </button>
            {visibility ? (
              <Modal
                visibility={visibility}
                image={image}
                total={total}
                setVisibility={setVisibility}
              />
            ) : (
              ""
            )}
            <button className={styles.selectAll}> Select All </button>
          </div>
          <div className={styles.totalFlex}>
            <div className={styles.total}>
              {" "}
              {total} / {image.length} Selected{" "}
            </div>
          </div>
        </div>
        <div className={styles.famous}>
          <div className={styles.firstFamous}> Most Borrowed </div>
          <div></div>
          <p> Bestsellers </p>
          <div></div>
          <p> All Books </p>
        </div>
        <div className={styles.bookList}>
          {image.map((val) => {
            return (
              <div
                key={val.id}
                onClick={() => handleSelection(val.id)}
                className={styles.book}
              >
                <img
                  alt="randomImage"
                  src={peppa}
                  className={`${styles.bookImage} `}
                />
                <div className={`${val.selected ? styles.selected : ""}`}></div>
                <div className={styles.number}> 1SBN - {val.no} </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Main;
