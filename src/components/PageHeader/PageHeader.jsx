import css from './PageHeader.module.css';

export default function PageHeader({ title, btnTitle, btnAction, children }) {
  return (
    <div className={css.pageHeaderWrapper}>
      <div className={css.titleWrapper}>
        <h1 className={css.pageTitle}>{title}</h1>
        <button className={css.headerBtn} type="button" onClick={()=> btnAction()}>{btnTitle}</button>
      </div>
      {children}
    </div>
  );
}
