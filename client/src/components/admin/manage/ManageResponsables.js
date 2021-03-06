import React, { useEffect, useState } from "react";
import DataTables from "../../common/DataTables";
import PagedTable from "../../common/PagedTable";
import {
  getResponsables,
  deleteResponsable,
} from "../../../redux/actions/admin";
import { connect } from "react-redux";
import Loading from "../../common/Loading";
import Modal from "../../common/Modal";
import AddResponsable from "./AddResponsable";

const ManageResponsables = ({
  getResponsables,
  deleteResponsable,
  admin: { responsables, loading },
}) => {
  useEffect(() => {
    getResponsables();
  }, []);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [respoToDelete, setRespoToDelete] = useState(-1);

  const handleModal = () => {
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleDeleteState = (state) => {
    setDeleteModal(state);
  };

  const handleDelete = (respoID) => {
    setRespoToDelete(respoID);
    handleDeleteState(true);
  };

  const confirmDelete = () => {
    handleDeleteState(false);
    deleteResponsable(respoToDelete);
    setRespoToDelete(-1);
  };

  const cancelDelete = () => {
    handleDeleteState(false);
    setRespoToDelete(-1);
  };

  var users = [
    {
      id: 2,
      firstName: "Bob",
      lastName: "Maintain",
      email: "bob@gmail.com",

      createdAt: "2021-12-21T23:08:52.000Z",

      role: "responsable",
    },
  ];

  const columns = [
    {
      name: "Numero",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Prenom",
      selector: (row) => row.firstName,
      sortable: true,
    },
    {
      name: "Nom",
      selector: (row) => row.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Date de creation",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Action",
      selector: (row) =>
        deleteModal && row.id == respoToDelete ? (
          <>
            <button onClick={confirmDelete} className="small-button confirm">
              Confirmer
            </button>
            <button onClick={cancelDelete} className="small-button cancel">
              Annuler
            </button>
          </>
        ) : (
          <button onClick={() => handleDelete(row.id)} className="med-button">
            Supprimer
          </button>
        ),
    },
  ];

  return loading ? (
    <Loading />
  ) : (
    <div>
      <button onClick={handleModal} className="button">
        {modal ? "Annuler" : "Ajouter un responsable"}
      </button>
      {modal ? (
        <Modal>
          <AddResponsable endModal={closeModal} />
        </Modal>
      ) : (
        <></>
      )}
      <PagedTable data={responsables} columns={columns} />
      {/* <DataTables
        data={users}
        headers={["NUMERO", "PRENOM", "NOM", "EMAIL", "DATE CREATION", "ROLE"]}
      /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, { getResponsables, deleteResponsable })(
  ManageResponsables
);
