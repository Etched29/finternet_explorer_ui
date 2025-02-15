import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './program.css';
import ProgramTable from "./ProgramTable";


const Program = () => {
    const [selectedProgramId, setSelectedProgramId] = useState('');
    const navigate = useNavigate()

    const onExecuteCTAClick = (programId, name) => () => {
        console.log("onExecuteCTAClick", programId)
        setSelectedProgramId(programId);
        localStorage.setItem("selectedProgramId", programId)
        navigate(`/admin/programs/execute`)
    }

    console.log("selectedProgramId", selectedProgramId)

    return (
        <ProgramTable onExecuteCTAClick={onExecuteCTAClick} selectedProgramId={selectedProgramId} />
    );
};

export default Program;

