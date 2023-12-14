import { useNavigate, useParams } from "react-router-dom";
import Page from "../components/UI/Page";
import UserForm from "../components/UserForm";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const EditUserPage = (props) => {
  const navigate = useNavigate();
  const resultsList = useSelector((state) => state.users.usersList);
  const params = useParams();

  const user = resultsList.find((user) => { if (user.id === params.userID) { console.log(user) }; return user.id === params.userID});
  console.log(resultsList)
  console.log(user);



  // useEffect(() => {
  //   if (!user) {
  //     navigate("..");
  //   }
  // }, []);

  return (
    <Page title="Cadastra Usuário">
      <UserForm user={resultsList[0]} />;
    </Page>
  );
};

export default EditUserPage;
