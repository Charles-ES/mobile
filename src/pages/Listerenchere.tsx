import {
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import Adresse from "./Adresse";
import "./Listerenchere.css";
import Menu from "./Menu";



function Listerenchere() {
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


  const listeenchereUrl = Adresse() + "/encheres";
  const [datalisteenchere, setDatalisteenchere] = useState([]);
  const listeenchere = () => {
    return fetch(listeenchereUrl, {
      method: "get",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then((result) => {
        setDatalisteenchere(result.data);
      });
   };


  useEffect(() => {
    if (localStorage.getItem("value") == null) {
      window.location.replace("/");
    }
    else {
      getToken();
    }
    listeenchere();
  }, []);

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
          {datalisteenchere.map((listeenchere: any) => (
            <IonCard color="light" key={listeenchere.id}>
              <IonCardContent>
                Nom du Produit : {listeenchere.nomProduit}
              </IonCardContent>
              <IonCardContent>
                Date et heure debut : {listeenchere.dateHeureDebut}
              </IonCardContent>
              <IonCardContent>
                Date et heure fin : {listeenchere.dateHeureFin}
              </IonCardContent>
              <IonCardContent>
                Prix départ : {listeenchere.prixDepart}
              </IonCardContent>
              <IonCardContent>
                Etat : {listeenchere.etat}
              </IonCardContent>
            </IonCard>
          ))}
           
        </IonContent>
      </IonPage>
    </>
  );
}
export default Listerenchere;
