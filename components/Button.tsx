import styles from "../styles/Button.module.scss";
export const Button = ({ children, onClickFunc }: any) => {
  return (
    <button className={styles.green_btn} onClick={onClickFunc}>
      {children}
    </button>
  );
};
