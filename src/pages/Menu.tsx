import {
    IonButton,
    IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Adresse from "./Adresse";
import "./Menu.css";





function Menu() {

  const logouturl = Adresse() + "/client/logout";

  const logout = () => {
    return fetch(logouturl, {
      method: "put",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        value: localStorage.getItem("value")
      }),
    }).then(response => response.json())
    .then((result) => {
      if (result.data != null) {
        localStorage.removeItem("value");
        window.location.replace("/client/login");
      }
    });
  };
  

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonList>
            <IonItem>
              <IonButtons slot="start">
                <IonButton onClick={() => window.location.replace("/enchere/ajouter")}>Ajouter Enchere</IonButton>
              </IonButtons>
            </IonItem>
            <IonItem>
              <IonButtons slot="start">
                <IonButton onClick={() => window.location.replace("/enchere/recharger")}>recharger Enchere</IonButton>
              </IonButtons>
            </IonItem>
            <IonItem>
              <IonButtons slot="start">
                <IonButton onClick={() => window.location.replace("/encheres")}>Lister Enchere</IonButton>
              </IonButtons>
            </IonItem>
            <IonItem>
              <IonButtons slot="start">
                <IonButton onClick={() => logout() }>Déconnexion</IonButton>
              </IonButtons>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
}
export default Menu;
