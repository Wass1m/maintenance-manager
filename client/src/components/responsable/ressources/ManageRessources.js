import React, { useEffect, useState } from "react";
import DataTables from "../../common/DataTables";
import PagedTable from "../../common/PagedTable";
import {
  getRessources,
  deleteRessource,
} from "../../../redux/actions/ressource";
import { connect } from "react-redux";
import Loading from "../../common/Loading";
import Modal from "../../common/Modal";
import AddRessource from "./AddRessource";
import { useNavigate } from "react-router-dom";

const ManageRessources = ({
  getRessources,
  deleteRessource,
  ressource: { ressources, loading },
}) => {
  useEffect(() => {
    getRessources();
  }, []);

  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [ressourceToDelete, setRessourceToDelete] = useState(-1);

  const handleModal = () => {
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleDeleteState = (state) => {
    setDeleteModal(state);
  };

  const handleDelete = (ressourceID) => {
    setRessourceToDelete(ressourceID);
    handleDeleteState(true);
  };

  const confirmDelete = () => {
    handleDeleteState(false);
    deleteRessource(ressourceToDelete);
    setRessourceToDelete(-1);
  };

  const cancelDelete = () => {
    handleDeleteState(false);
    setRessourceToDelete(-1);
  };

  let navigate = useNavigate();

  const columns = [
    {
      name: "Numero",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Localisation",
      selector: (row) => row.localisation,
      sortable: true,
    },
    {
      name: "Date de creation",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Responsable",
      selector: (row) => row.responsableID,
    },
    {
      name: "Anomalies",
      selector: (row) => row.anomalies.length,
    },
    {
      name: "Actions",
      selector: (row) =>
        deleteModal && row.id == ressourceToDelete ? (
          <>
            <button onClick={confirmDelete} className="small-button confirm">
              Confirmer
            </button>
            <button onClick={cancelDelete} className="small-button cancel">
              Annuler
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() =>
                navigate(`/responsable/manage/ressources/${row.id}`)
              }
              className="small-button"
            >
              Consulter
            </button>
            <button
              onClick={() => handleDelete(row.id)}
              className="small-button"
            >
              Supprimer
            </button>
          </>
        ),
    },
  ];

  var ressourcesData = [];

  ressources.map((ress) => {
    ressourcesData.unshift({
      ...ress.ressource,
      anomalies: ress.anomalies,
    });
  });

  return loading ? (
    <Loading />
  ) : (
    <div>
      <button onClick={handleModal} className="button">
        {modal ? "Annuler" : "Ajouter une ressource"}
      </button>
      {modal ? (
        <Modal endModal>
          <AddRessource endModal={closeModal} />
        </Modal>
      ) : (
        <></>
      )}
      <PagedTable data={ressourcesData} columns={columns} />
      {/* <DataTables
        data={users}
        headers={["NUMERO", "PRENOM", "NOM", "EMAIL", "DATE CREATION", "ROLE"]}
      /> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ressource: state.ressource,
});

export default connect(mapStateToProps, { getRessources, deleteRessource })(
  ManageRessources
);
