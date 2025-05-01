import AddData from "./addData";
import { useState, useEffect } from "react";
import EditHistoryEntry from "./editHistory";
import {
  Button,
  Input,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider,
} from "@heroui/react";

export default function CarTable({ user, tableData, setTableData }) {
  const [filter, setFilter] = useState(""); // Single input for filtering all fields
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [selectedRow, setSelectedRow] = useState(null); // State for selected row data
  const [isModalOpen, setIsModalOpen] = useState(false); // State for details modal visibility
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal visibility
  const itemsPerPage = 20; // Number of items per page

  const [filteredTableData, setFilteredTableData] = useState([]); // State for filtered data
  const [paginatedData, setPaginatedData] = useState([]); // State for paginated data

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch("/api/getCarHistory");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setTableData(data); // Set the fetched data to the table
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
    console.log("Table data fetched successfully");
  }, []);

  // Update filtered and paginated data whenever tableData, filter, or currentPage changes
  useEffect(() => {
    const lowerCaseFilter = filter.toLowerCase();

    // Filter the table data
    const filteredData = tableData.filter((row) => {
      return (
        row?.reg?.toLowerCase().includes(lowerCaseFilter) ||
        row?.date?.toLowerCase().includes(lowerCaseFilter) ||
        row?.job?.toLowerCase().includes(lowerCaseFilter) ||
        row?.carmodel?.toLowerCase().includes(lowerCaseFilter)
      );
    });

    setFilteredTableData(filteredData);

    // Paginate the filtered data
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filteredData.slice(startIndex, startIndex + itemsPerPage);

    setPaginatedData(paginated);

    // Ensure the current page is valid
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [tableData, filter, currentPage]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (
      newPage >= 1 &&
      newPage <= Math.ceil(filteredTableData.length / itemsPerPage)
    ) {
      setCurrentPage(newPage);
    }
  };

  // Handle row click
  const handleRowClick = (row) => {
    setSelectedRow(row); // Set the selected row data
    setIsModalOpen(true); // Open the modal
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedRow(null); // Clear the selected row data
  };

  // Handle edit
  const handleEdit = (rowData) => {
    handleCloseModal(); // Close the details modal
    setSelectedRow(rowData); // Set the selected row data for editing
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false); // Close the edit modal
    setSelectedRow(null); // Clear the selected row data
  };

  const handleDelete = async (entry) => {
    let id = entry.id;
    if (!id) {
      console.error("ID is required for deletion");
      return;
    }

    try {
      const response = await fetch("/api/deleteCarHistory", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        handleCloseModal();
        setTableData((prevData) => prevData.filter((row) => row.id !== id));
      } else {
        const result = await response.json();
        console.error("Failed to delete record:", result.error);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="mx-1 sm:mx-12">
      <div className="mb-4 flex gap-4 justify-center">
        <Input
          type="text"
          placeholder="Filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 rounded "
        />
      </div>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>REG</TableColumn>
          <TableColumn className="hidden md:block">Model</TableColumn>
          <TableColumn>DATE</TableColumn>
          <TableColumn>JOB</TableColumn>
        </TableHeader>
        <TableBody>
          {paginatedData.map((row, index) => (
            <TableRow
              key={index}
              onClick={() => handleRowClick(row)} // Open modal on row click
              className="cursor-pointer"
            >
              <TableCell className="text-md">{row.reg}</TableCell>
              <TableCell className="text-md hidden md:block">
                {row.carmodel === "" ? " -" : row.carmodel}
              </TableCell>
              <TableCell className="text-md">{row.date}</TableCell>
              <TableCell className="text-md">{row.job}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center items-center mt-4 gap-2">
        <Button
          disabled={currentPage === 1}
          onPress={() => handlePageChange(currentPage - 1)}
          className="p-2 rounded "
          size="sm"
        >
          {"<"}
        </Button>
        <span>
          Page {currentPage} of{" "}
          {Math.ceil(filteredTableData.length / itemsPerPage)}
        </span>
        <Button
          disabled={
            currentPage === Math.ceil(filteredTableData.length / itemsPerPage)
          }
          onPress={() => handlePageChange(currentPage + 1)}
          className="p-2 rounded "
          size="sm"
        >
          {">"}
        </Button>
      </div>

      {/* Details Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onOpenChange={handleCloseModal}
          backdrop="blur"
        >
          <ModalContent>
            <ModalHeader className="text-center font-bold underline">
              Details
            </ModalHeader>
            <ModalBody>
              {selectedRow && (
                <div>
                  <p>
                    <strong>REG:</strong> {selectedRow.reg}
                  </p>
                  <p>
                    <strong>DATE:</strong> {selectedRow.date}
                  </p>
                  <p>
                    <strong>JOB:</strong> {selectedRow.job}
                  </p>
                  {selectedRow.carmodel && (
                    <p>
                      <strong>Car Model:</strong> {selectedRow.carmodel}
                    </p>
                  )}
                  {selectedRow.description && (
                    <p>
                      <strong>Description:</strong> {selectedRow.description}
                    </p>
                  )}

                  {selectedRow.mileage > 0 && (
                    <p>
                      <strong>Mileage:</strong> {selectedRow.mileage}
                    </p>
                  )}

                  {selectedRow.clientname && (
                    <p>
                      <strong>Client Name:</strong> {selectedRow.clientname}
                    </p>
                  )}
                  {selectedRow.phone && (
                    <p>
                      <strong>Phone:</strong> {selectedRow.phone}
                    </p>
                  )}

                  {selectedRow.price > 0 && (
                    <p>
                      <strong>Price:</strong> {selectedRow.price} €
                    </p>
                  )}
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                color="danger"
                onPress={() => handleDelete(selectedRow)}
                className={`${user?.edit ? "" : "hidden"}`}
              >
                Delete
              </Button>
              <Button
                size="sm"
                color="warning"
                onPress={() => handleEdit(selectedRow)} // Open edit modal
                className={`${user?.edit ? "" : "hidden"}`}
              >
                Edit
              </Button>
              <Button size="sm" onPress={handleCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditHistoryEntry
          data={selectedRow}
          onClose={handleEditClose}
          setTableData={setTableData}
        />
      )}
    </div>
  );
}
