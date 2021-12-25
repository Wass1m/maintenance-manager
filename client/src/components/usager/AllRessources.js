import React, { useEffect, useState } from "react";
import ressourceImg from "../../assets/images/ressource.png";
import FilterComponent from "../common/shared/FilterComponent";
import { getAllRessources } from "../../redux/actions/ressource";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomePage from "../common/HomePage";

const AllRessources = ({
  getAllRessources,
  ressource: { ressources },
  auth: { user },
}) => {
  useEffect(() => {
    getAllRessources();
  }, []);

  var data = [];
  // useState pour le filtre
  const [filterText, setFilterText] = useState("");
  // useState pour le reset de la pagination
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // filtres selon differents criteres (nom, prenom, id, email) ou description localisation pour une ressource

  var myRessources = ressources;

  const filteredItems = myRessources.filter(
    (item) =>
      (item.ressource.description &&
        item.ressource.description
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.ressource.localisation &&
        item.ressource.localisation
          .toLowerCase()
          .includes(filterText.toLowerCase()))
  );

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  let navigate = useNavigate();

  const handleNavigate = (ressourceID) => {
    navigate(`/signaler/${ressourceID}`);
  };

  return (
    <div className="user-ressources">
      <div className="filter">
        <FilterComponent
          onFilter={(e) => setFilterText(e.target.value)}
          onClear={handleClear}
          filterText={filterText}
          filterMessage={"Description, Localisation"}
        />
      </div>

      <div className="ressources-list">
        {filteredItems.map((ressource) => (
          <div
            onClick={() => handleNavigate(ressource.ressource.id)}
            key={ressource.ressource.id}
            className="ressource-card"
          >
            <div className="card-header text-center">
              {ressource.ressource.description}
            </div>
            <div className="card-image">
              <img src={ressourceImg} alt="" />
            </div>
            <div className="card-footer text-center">
              {ressource.ressource.localisation}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ressource: state.ressource,
  auth: state.authentification,
});

export default connect(mapStateToProps, { getAllRessources })(AllRessources);
