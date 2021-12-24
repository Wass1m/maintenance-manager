import React, { useState } from "react";
import DataTable from "react-data-table-component";
import FilterComponent from "./shared/FilterComponent";

// Ce composant reutiliasble permet d'obtenir un tableau de donnees ayant une pagination et une filtrage

const PagedTable = ({ columns, data }) => {
  // useState pour le filtre
  const [filterText, setFilterText] = useState("");
  // useState pour le reset de la pagination
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  // filtres selon differents criteres (nom, prenom, id, email) ou description localisation pour une ressource
  const filteredItems = data.filter(
    (item) =>
      (item.firstName &&
        item.firstName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.lastName &&
        item.lastName.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.email &&
        item.email.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.id && item.id.toString().includes(filterText)) ||
      (item.localisation &&
        item.localisation.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.description &&
        item.description.toLowerCase().includes(filterText.toLowerCase()))
  );

  // fonction qui retourne le composant de filtrage
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      sort
      columns={columns}
      data={filteredItems}
      pagination
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
    />
  );
};

export default PagedTable;
