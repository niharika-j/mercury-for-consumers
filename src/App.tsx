import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import dealsIcon from './assets/images/deals.png';
import feedIcon from './assets/images/feed.png';
import mapIcon from './assets/images/map.png';
import profileIcon from './assets/images/profile.png';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/deals" component={Tab1} exact={true} />
          <Route path="/tab2" component={Tab2} exact={true} />
          <Route path="/tab3" component={Tab3} exact={true} />
          <Route path="/tab4" component={Tab3} />
          <Route path="/" render={() => <Redirect to="/deals" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" className="mercury-tab-bar">
          <IonTabButton className="mercury-tab-btn" tab="tab1" href="/deals">
            <img src={dealsIcon} alt="" />
            <IonLabel>Deals</IonLabel>
          </IonTabButton>
          <IonTabButton className="mercury-tab-btn" tab="tab2" href="/tab2" disabled>
            <img src={mapIcon} alt="" />
            <IonLabel>Map</IonLabel>
          </IonTabButton>
          <IonTabButton className="mercury-tab-btn" tab="tab3" href="/tab3" disabled>
            <img src={feedIcon} alt="" />
            <IonLabel>Feed</IonLabel>
          </IonTabButton>
          <IonTabButton className="mercury-tab-btn" tab="tab4" href="/tab4" disabled>
            <img src={profileIcon} alt="" />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
