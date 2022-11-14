/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useState, useEffect } from "react";
import { doc, increment, updateDoc, onSnapshot } from "firebase/firestore";
import { setFavorite } from "../../../store/userSlice";

import { db } from "../../../firebase";
import nolike from "../../../img/nolike.svg";
import likeic from "../../../img/like.svg";

import classes from "./PostItem.module.scss";

export const PostItem = ({ post }) => {
  console.log("post = ", post);
  const {
    name,
    description,
    likes,
    difficulty,
    ingredients,
    elId,
    image
  } = post;

  const paramId = `/articles/${elId}`;
  const recipesRef = doc(db, "1", elId);
  const useStateUser = () => {
    const stateUserst = useSelector((state) => state.user);
    return stateUserst;
  };

  const { userData, email, favoritesArray } = useStateUser();

  const NewfavoritesArray = {};
  for (let elId in favoritesArray) {
    NewfavoritesArray[elId] = { ...favoritesArray[elId] };
  }

  console.log("NewfavoritesArray = ", NewfavoritesArray);
  console.log("Данные о пользователе из Redux Store: ", email);

  const [like, setLike] = useState(NewfavoritesArray[elId][email]);
  const [likeIcon, setLikeIcon] = useState(nolike);
  const [likeCount, setLikeCount] = useState(likes);
  const [isLikeDsabled, setLikeDsabled] = useState(true);

  const dispath = useDispatch();
  const unsub = onSnapshot(doc(db, "1", elId), (doc) => {
    setLikeCount(doc.data().recipes.likes);
  });

  useEffect(() => {
    if (NewfavoritesArray[elId][email]) {
      setLike(true);
      setLikeIcon(likeic);
    }

    if (userData) {
      setLikeDsabled(false);
    }
    if (!userData) {
      setLikeIcon(nolike);
      setLikeDsabled(true);
    }
  }, [userData, post.favorite]);

  const onlikeClick = async (event) => {
    if (!like) {
      console.log("Читаем объект с лайками из cтейта: ", NewfavoritesArray);

      if (NewfavoritesArray[elId][email]) {
        NewfavoritesArray[elId][email] = !NewfavoritesArray[elId][email];
      } else {
        NewfavoritesArray[elId][email] = true;
      }
      // console.log("favoritesArray = ", NewfavoritesArray);
      // console.log("favoritesArray[elId] = ", NewfavoritesArray[elId]);
      // console.log(
      //   "favoritesArray[elId][email] = ",
      //   NewfavoritesArray[elId][email]
      // );

      dispath(
        setFavorite({
          favoritesArray: NewfavoritesArray
        })
      );
      // console.log("Вы лайкнули пост!");
      // console.log("NewfavoritesArray = ", NewfavoritesArray);
      // console.log("favoritesArray[elId] = ", favoritesArray[elId]);

      await updateDoc(recipesRef, {
        // "recipes.favorite": {},
        "recipes.favorite": NewfavoritesArray[elId],
        "recipes.likes": increment(1)
      }),
        setLike(true);
      setLikeIcon(likeic);
    } else {
      if (NewfavoritesArray[elId][email]) {
        NewfavoritesArray[elId][email] = !NewfavoritesArray[elId][email];
      } else {
        NewfavoritesArray[elId][email] = true;
      }
      // console.log("favoritesArray = ", NewfavoritesArray);
      // console.log("favoritesArray[elId] = ", NewfavoritesArray[elId]);
      // console.log(
      //   "favoritesArray[elId][email] = ",
      //   NewfavoritesArray[elId][email]
      // );

      dispath(
        setFavorite({
          favoritesArray: NewfavoritesArray
        })
      );
      await updateDoc(recipesRef, {
        // "recipes.favorite": {},
        "recipes.favorite": NewfavoritesArray[elId],
        "recipes.likes": increment(-1)
      }),
        setLike(false);
      setLikeIcon(nolike);
    }
  };
  return (
    <>
      <li className={classes["recipeCard"]}>
        <div
          className={classes["image__container"]}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className={classes["recipeCard__information"]}>
          <div className={classes["recipeCard__header"]}>
            <div>
              <Link to={paramId} className={classes["title_item"]}>
                {name}
              </Link>
            </div>
          </div>
          <div className={classes["recipeCard__description"]}>
            {description}
          </div>
          <div className={classes["recipeCard__prefixText"]}>
            Вам понадобится:
          </div>
          <div className={classes["recipeCard__ingredients"]}>
            {ingredients}
          </div>
          <div className={classes["recipeCard__footer"]}>
            <div className={classes["recipeCard__likes"]}>
              <button
                type="button"
                className={classes["button-likes"]}
                onClick={onlikeClick}
                disabled={isLikeDsabled}
              >
                <img
                  className={classes["post_like"]}
                  src={likeIcon}
                  alt="like"
                />
              </button>
              {likeCount}
            </div>
            <div className={classes["recipeCard__difficulty"]}>
              {difficulty}
            </div>
          </div>
        </div>
      </li>
    </>
  );
};
