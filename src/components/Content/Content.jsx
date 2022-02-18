import { UserContext } from "../../App";
import { useContext } from "react";

export default function Content(props) {

    return (
      <>
      {props.user &&
      <>
       <h1>{props.user.id}</h1>
       <h1>{props.user.username}</h1>
       <h1>{props.user.displayName}</h1>
       <h1>{props.user.capital}</h1>
       </>
      }
      </>
    );
}
