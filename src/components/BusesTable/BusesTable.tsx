import React from 'react';
import { Bus } from '../../interfaces/Bus.ts';
import '../BusesTable/BusesTable.css';
import { FiLoader, FiAlertCircle, FiEye, FiCheckCircle, FiXCircle } from 'react-icons/fi';

interface BusesTableProps {
    buses: Bus[];
    loading: boolean;
    onViewDetails: (id: number) => void;
}

const BusesTable: React.FC<BusesTableProps> = ({ buses, loading, onViewDetails }) => {
    if (loading) {
        return <div className="loading-message">
            <FiLoader size={20} className="animate-spin" />
            Cargando buses...
        </div>;
    }

    if (buses.length === 0) {
        return <div className="no-data-message">
            <FiAlertCircle size={20} />
            No se encontraron buses
        </div>;
    }

    return (
        <div className="buses-table-container">
            <table className="buses-table">
                <thead>
                    <tr>
                        <th>Número de Bus</th>
                        <th>Placa</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {buses.map((bus) => (
                        <tr key={bus.id}>
                            <td>{bus.numeroBus}</td>
                            <td>{bus.placa}</td>
                            <td>
                                <span className={`status-badge ${bus.activo ? 'active' : 'inactive'}`}>
                                    {bus.activo ? (
                                        <>
                                            <FiCheckCircle size={14} />
                                            Activo
                                        </>
                                    ) : (
                                        <>
                                            <FiXCircle size={14} />
                                            Inactivo
                                        </>
                                    )}
                                </span>
                            </td>
                            <td>
                                <button
                                    onClick={() => onViewDetails(bus.id)}
                                    className="view-details-button"
                                >
                                    <FiEye size={14} />
                                    Ver Detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BusesTable;