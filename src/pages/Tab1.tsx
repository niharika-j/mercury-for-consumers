import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonSearchbar, IonGrid, IonRow, IonCol, IonSelect, IonSelectOption, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, withIonLifeCycle } from '@ionic/react';

import './Tab1.css';

import filter from '../assets/images/filter.png';
import filterSelected from '../assets/images/filter-selected.png';
import logo from '../assets/images/logo.png';
import umami from '../assets/images/umami.png';
import friend1 from '../assets/images/friend1.png';
import friend2 from '../assets/images/friend2.png';
import friend3 from '../assets/images/friend3.png';
import fullStar from '../assets/images/star-filled.png';
import emptyStar from '../assets/images/star.png';
import spa from '../assets/images/spa.png';
import clothes from '../assets/images/clothes.png';
import sushi from '../assets/images/sushi.png';
import merchant from '../assets/images/merchant.png';

import fire from '../firebaseConfig';

const dealsForYou = [
  {
    name: "Evolve Wellness Spa",
    imgUrl: spa,
    deal: "10% Off",
    from: "friend",
    type: "service",
    friendImg: friend2,
    expiry: ""
  },
  {
    name: "Mount Everest Sushi",
    imgUrl: sushi,
    deal: "10% Off",
    from: "friend",
    type: "restaurant",
    friendImg: friend3,
    expiry: ""
  },
  {
    name: "Aja's Clothes",
    imgUrl: clothes,
    deal: "10% Off",
    from: "friend",
    type: "store",
    friendImg: friend1,
    expiry: ""
  }
];

const dealsForFriends = [
  {
    name: "Evolve Wellness Spa",
    imgUrl: spa,
    deal: "10% Off",
    limit: 5,
    available: 5
  },
  {
    name: "Mount Everest Sushi",
    imgUrl: sushi,
    deal: "10% Off",
    limit: 4,
    available: 1
  },
  {
    name: "Aja's Clothes",
    imgUrl: clothes,
    deal: "10% Off",
    from: "friend",
    limit: 10,
    available: 7
  }
];

class Tab1 extends React.Component {
  state = {
    searchText: "",
    segment: "you",
    isFilterSelected: false,
    dealsForYouData: [...dealsForYou],
    dealsForFriendsData: [...dealsForFriends]
  }

  ionViewDidEnter() {
    fire.database().ref('/').on('value', (snapshot) => {
      let currentDealsForYou = [...dealsForYou];
      let currentDealsForFriends = [...dealsForFriends];
      let currentUmamiDeals = snapshot.val().current;
      if(currentUmamiDeals&&currentUmamiDeals.length>0){
        for(let i=0;i<currentUmamiDeals.length;i++){
          currentDealsForYou.unshift(
            {
              name: "Umami",
              imgUrl: umami,
              deal: currentUmamiDeals[i].deal_details,
              from: "merchant",
              type: "restaurant",
              expiry: this.formatDate(currentUmamiDeals[i].expires),
              friendImg: ""
            }
          )
        }
      }

      let currentUmamiGiftDeal = snapshot.val().giftDeal;
      if(currentUmamiGiftDeal) {
        currentDealsForFriends.unshift(
          {
            name: "Umami",
            imgUrl: umami,
            deal: currentUmamiGiftDeal.deal_type==="%"?`${currentUmamiGiftDeal.deal_value}% Off`:`$${currentUmamiGiftDeal.deal_value} Off`,
            limit: currentUmamiGiftDeal.friends_limit,
            available: currentUmamiGiftDeal.friends_limit
          }
        );
        }
      this.setState({dealsForYouData: currentDealsForYou, dealsForFriendsData: currentDealsForFriends});
    });
  }

  formatDate(dateMs: number) {
    if(!dateMs) {
        return "Ongoing";
    }
    let dateObj = new Date(dateMs);
    let days = Math.ceil((dateObj.getTime() - new Date().getTime())/(1000*60*60*24))
    return `${days} days left`;
  }
  render() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          {/* <IonTitle>Tab 1</IonTitle> */}
          <div className="deals-fixed-content">
            <img src={logo} alt="Mercury logo" />

            <IonSegment mode="ios" className="mercury-deals-segment" value={this.state.segment} onIonChange={e => this.setState({segment: e.detail.value?e.detail.value:""})}>
              <IonSegmentButton className="mercury-deals-segment-button" value="you">
                <IonLabel><span className="mercury-deals-segment-button-label">Deals for You</span></IonLabel>
              </IonSegmentButton>
              <IonSegmentButton className="mercury-deals-segment-button" value="friends">
                <IonLabel><span className="mercury-deals-segment-button-label">Deals for Friends</span></IonLabel>
              </IonSegmentButton>
            </IonSegment>

            <div className="mercury-deals-search-filter">
              <IonSearchbar mode="ios" type="text" inputmode="text" value={this.state.searchText} className="mercury-deals-search" onIonChange={e => this.setState({searchText: e.detail.value!})} placeholder="Search business or friend" showCancelButton="never"></IonSearchbar>
              
                {!this.state.isFilterSelected?
                  <img src={filter} alt="filter icon" onClick={() => this.setState({isFilterSelected: true})} />
                  :
                  <img src={filterSelected} alt="filter green icon" onClick={() => this.setState({isFilterSelected: false})} />
                }
            </div>

            {this.state.isFilterSelected?
            (<IonGrid className="mercury-deals-filter-grid">
              <IonRow className="ion-justify-content-between ion-align-items-center mercury-deals-filter-row">
                <IonCol className="mercury-deals-filter-col">
                  <IonSelect className="mercury-deals-filter-select" interface="popover" placeholder="Business Type">
                    <IonSelectOption value="restaurant">Restaurant</IonSelectOption>
                    <IonSelectOption value="service">Service</IonSelectOption>
                    <IonSelectOption value="store">Store</IonSelectOption>
                  </IonSelect>
                </IonCol>
                <IonCol className="mercury-deals-filter-col">
                  <IonSelect className="mercury-deals-filter-select" interface="popover" placeholder="From">
                    <IonSelectOption value="merchants">Merchants</IonSelectOption>
                    <IonSelectOption value="friends">Friends</IonSelectOption>
                  </IonSelect>
                </IonCol>
                <IonCol className="mercury-deals-filter-col">
                  <IonSelect className="mercury-deals-filter-select" interface="popover" placeholder="Deal Type">
                    <IonSelectOption value="%">% Off</IonSelectOption>
                    <IonSelectOption value="$">$ Off</IonSelectOption>
                  </IonSelect>
                </IonCol>
                <IonCol className="mercury-deals-filter-col">
                  <IonSelect className="mercury-deals-filter-select" placeholder="Sort">
                    <IonSelectOption value="htl">Highest to lowest deal</IonSelectOption>
                    <IonSelectOption value="lth">Lowest to highest deal</IonSelectOption>
                  </IonSelect>
                </IonCol>
              </IonRow>
            </IonGrid>):null}
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          this.state.segment==="you"?
          (
            <div>
              {this.state.dealsForYouData?this.state.dealsForYouData.map((deal, index) => 
              (
                <IonCard className="deal-card" key={`dealForYou${index}`}>
                  <img className="deal-card-merchant-img" src={deal.imgUrl} alt={`${deal.name} logo`} />
                  <div className="deal-card-content">
                    <IonCardHeader className="deal-card-header">
                      <IonCardTitle className="deal-card-title">{deal.name}</IonCardTitle>
                      <IonCardSubtitle className="deal-card-subtitle">
                        4.8 <img src={fullStar} alt="full star" /><img src={fullStar} alt="full star" /><img src={fullStar} alt="full star" /><img src={fullStar} alt="full star" /><img src={emptyStar} alt="full star" />
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <div className="deal-card-info-content">
                      <div className="deal-card-info">
                        {deal.deal}
                      </div>
                      <div className="deal-card-expiry">
                        {deal.expiry?deal.expiry:"No expiry"} {deal.from==="friend"?(<img src={deal.friendImg} alt="friend profile" />):(<img src={merchant} alt="business icon" />)}
                      </div>
                    </div>
                  </div>
                </IonCard>
              )
              ):null}
            </div>
          )
          :
          (
            <div>
              {this.state.dealsForFriendsData?this.state.dealsForFriendsData.map((deal, index) => 
              (
                <IonCard className="deal-card" key={`dealForFriend${index}`}>
                  <img className="deal-card-merchant-img" src={deal.imgUrl} alt={`${deal.name} logo`} />
                  <div className="deal-card-content">
                    <IonCardHeader className="deal-card-header">
                      <IonCardTitle className="deal-card-title">{deal.name}</IonCardTitle>
                      <IonCardSubtitle className="deal-card-subtitle">
                        4.8 <img src={fullStar} alt="full star" /><img src={fullStar} alt="full star" /><img src={fullStar} alt="full star" /><img src={fullStar} alt="full star" /><img src={emptyStar} alt="full star" />
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <div className="deal-card-info-content">
                      <div className="deal-card-info">
                        {deal.deal}
                      </div>
                      <div className="deal-card-available">
                        {`${deal.available}/${deal.limit} available`}
                      </div>
                    </div>
                  </div>
                </IonCard>
              )
              ):null}
            </div>
          )
        }
      </IonContent>
    </IonPage>
  );
}
}

export default withIonLifeCycle(Tab1);
