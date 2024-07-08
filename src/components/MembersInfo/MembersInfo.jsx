import css from "./MembersInfo.module.css";

export default function MembersInfo({ title, group, children }) {
  return (
    <div className={css.infoWrapper}>
      <h2 className={css.infoTitle}>{`${title} (${group.members.length})`}</h2>
      {children}
    </div>
  );
}
