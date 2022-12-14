import { Tab } from '../../const';

type TabsProps = {
  onTab: (tab: Tab) => void;
  activeTab: Tab;
}

function Tabs({onTab, activeTab}: TabsProps) {
  return (
    <nav className="film-nav film-card__nav">
      <ul className="film-nav__list">
        <li className={`film-nav__item ${activeTab === Tab.Overview && 'film-nav__item--active'}`}>
          <div className="film-nav__link" onClick={() => onTab(Tab.Overview)}>Overview</div>
        </li>
        <li className={`film-nav__item ${activeTab === Tab.Details && 'film-nav__item--active'}`}>
          <div className="film-nav__link" onClick={() => onTab(Tab.Details)}>Details</div>
        </li>
        <li className={`film-nav__item ${activeTab === Tab.Reviews && 'film-nav__item--active'}`}>
          <div className="film-nav__link" onClick={() => onTab(Tab.Reviews)}>Reviews</div>
        </li>
      </ul>
    </nav>
  );
}

export default Tabs;
