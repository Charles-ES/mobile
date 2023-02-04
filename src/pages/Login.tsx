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
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useEffect, useRef } from "react";
import "./Login.css";
import Adresse from "./Adresse";
function Login() {
  const telephone = useRef<HTMLIonInputElement>(null);
  const motdepasse = useRef<HTMLIonInputElement>(null);
  const loginurl = Adresse() + "/client/login";

  const login = () => {
    return fetch(loginurl, {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        telephone: telephone.current?.value,
        motdepasse: motdepasse.current?.value
      }),
    })
      .then(response => response.json())
      .then(result => {
        if (result.data != null) {
          localStorage.setItem("value", result.data.value);
          window.location.replace('/enchere/ajouter')
        }
        else{
          presentToast('bottom', result.error.message);
        }
      });
  };
 
  const [present] = useIonToast();
  const presentToast = (position: 'top' | 'middle' | 'bottom', messagevalue:string) => {
    present({
      message: messagevalue,
      duration: 2000,
      position: position
    });
  };

  useEffect(() => {
    if (localStorage.getItem("value") != null) {
      window.location.replace("/enchere/ajouter")
    }
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => window.location.replace("/client/register")}>
              S'incrire
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonLabel position="floating">Telephone</IonLabel>
              <IonInput
                required={true}
                ref={telephone}
                placeholder="Entrer votre telephone"
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Mot de passe</IonLabel>
              <IonInput
                required={true}
                ref={motdepasse}
                type="password"
                placeholder="Entrer votre mot de passe"
              ></IonInput>
            </IonItem>
            <IonButton onClick={() => login()}>Se connecter</IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </>
  );
}
export default Login;
