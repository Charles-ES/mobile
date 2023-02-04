import React, { useEffect, useRef } from "react";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import Adresse from "./Adresse";
import Menu from "./Menu";

function Recharge() {

  const getTokenUrl = Adresse() + "/token/" + localStorage.getItem("value");

  const getToken = () => {
      return fetch(getTokenUrl, {
        method: "get",
        headers: { "Content-type": "application/json" }
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result.error != null || result.data == null) {
            localStorage.removeItem('value');
            window.location.replace("/");
          }
        });
    };

  const prix = useRef<HTMLIonInputElement>(null);

  const demander = () => {
    return fetch(Adresse() + "/compte/recharger1", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        token: localStorage.getItem("value"),
        montant: prix.current?.value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.data != null) {
          presentToast("bottom", result.data.message);
        }
      });
  };

  const [present] = useIonToast();
  const presentToast = (
    position: "top" | "middle" | "bottom",
    messagevalue: string
  ) => {
    present({
      message: messagevalue,
      duration: 2000,
      position: position,
    });
  };

  useEffect( () => {
    if (localStorage.getItem("value") == null) {
        window.location.replace("/")
      }
      else {
        getToken();
      }
  })

  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>Liste Enchere</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
              <div className="Enchere">
                <h1>Demande de rechargement</h1>
                <div className="form">
                  <IonItem>
                    <IonLabel aria-required={true} position="floating">
                      Insérer le prix :
                    </IonLabel>
                    <IonInput
                      ref={prix}
                      required={true}
                      type="number"
                      placeholder="Entrer le montant"
                    ></IonInput>
                  </IonItem>

                  <IonButton onClick={() => demander()}>Demander</IonButton>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
}

export default Recharge;
