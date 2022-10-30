import React from "react";
import style from "../styles/PostProfileConfig.module.css";
import PostDelete from "./PostDelete";
import PostEdit from "./PostEdit";

const PostProfileConfig = ({ image, content, postId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isEditModalOpen, setEditIsModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)

  function openOrCloseOptionsModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className={style.configContainer}>
      {isEditModalOpen && (
        <PostEdit
          image={image}
          content={content}
          postId={postId}
          setEditIsModalOpen={setEditIsModalOpen}
        />
      )}

      {isDeleteModalOpen && <PostDelete postId={postId} setIsDeleteModalOpen={setIsDeleteModalOpen} />}

      <button onClick={openOrCloseOptionsModal} className={style.configButton}>
        <div className={style.configButtonCircle1} />
        <div className={style.configButtonCircle2} />
        <div className={style.configButtonCircle3} />
      </button>

      {isModalOpen && (
        <ul className={style.listConfigContainer}>
          <li
            onClick={() => {
              setEditIsModalOpen(true);
              setIsModalOpen(false);
            }}
            className={style.listConfigItem}
          >
            Editar publicação
          </li>
          <li onClick={() => {
              setIsDeleteModalOpen(true);
              setIsModalOpen(false);
            }} className={style.listConfigItem}>Excluir publicação</li>
        </ul>
      )}
    </div>
  );
};

export default PostProfileConfig;
