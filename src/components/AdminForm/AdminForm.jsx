import Background from "../Background/Background.jsx"
import { Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { selectInfo } from "../../redux/selectors/selectInfo.js"
import { useDispatch, useSelector } from "react-redux"
import { getInfo } from "../../redux/actions/infoActions.js"
import "./AdminForm.modules.css"
import { updateDoc } from "firebase/firestore"
import { docRef } from "../../firebase/firebase.js"
import { useNavigate } from "react-router-dom"
import { storage } from "../../firebase/firebase.js"
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage"

const AdminForm = () => {
    return (
        <div id="pageDiv">
            <Background content={<AdminFormFunc />} />
        </div>
    )
}

export default AdminForm

const AdminFormFunc = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const getInfoThunk = () => dispatch(getInfo());
    useEffect(() => {
        getInfoThunk();
    }, []);
    const info = useSelector(selectInfo);
    let name = info?.name;
    let surname = info?.surname;
    let city = info?.city;
    let country = info?.country;
    let job = info?.job;
    let extraInfo = info?.extraInfo;
    let reference = info?.reference;
    useEffect(() => {
        updatedInfo = {
            name: name,
            surname: surname,
            city: city,
            country: country,
            job: job,
            extraInfo: extraInfo,
            reference: reference
        }
        setName(updatedInfo.name)
        setSurname(updatedInfo.surname)
        setCity(updatedInfo.city)
        setCountry(updatedInfo.country)
        setJob(updatedInfo.job)
        setExtraInfo(updatedInfo.extraInfo)
        setReference(updatedInfo.reference)
    }, [info]);
    let updatedInfo = {
        name: name,
        surname: surname,
        city: city,
        country: country,
        job: job,
        extraInfo: extraInfo,
        reference: reference
    }
    const [updatedName, setName] = useState(updatedInfo.name)
    const [updatedSurname, setSurname] = useState(updatedInfo.surname)
    const [updatedCity, setCity] = useState(updatedInfo.city)
    const [updatedCountry, setCountry] = useState(updatedInfo.country)
    const [updatedJob, setJob] = useState(updatedInfo.job)
    const [updatedExtraInfo, setExtraInfo] = useState(updatedInfo.extraInfo)
    const [updatedReference, setReference] = useState(updatedInfo.reference)


    const nameChangeHandle = (e) => {
        setName(e.target.value);
    }

    const surnameChangeHandle = (e) => {
        setSurname(e.target.value);
    }

    const cityChangeHandle = (e) => {
        setCity(e.target.value);
    }

    const countryChangeHandle = (e) => {
        setCountry(e.target.value);
    }

    const jobChangeHandle = (e) => {
        setJob(e.target.value);
    }

    const extraInfoChangeHandle = (e) => {
        setExtraInfo(e.target.value);
    }

    const ReferenceChangeHandle = (e) => {
        setReference(e.target.value);
    }
    const updateForm = document.getElementById("updateForm")
    const formSubmit = (e) => {
        e.preventDefault();
        updateDoc(docRef, {
            name: updatedName,
            surname: updatedSurname,
            city: updatedCity,
            country: updatedCountry,
            job: updatedJob,
            extraInfo: updatedExtraInfo,
            reference: updatedReference

        })
            .then(() => {
                updateForm.reset();
                navigate("../")
            })
        return;
    }

    return (
        <div>

            <Form onSubmit={formSubmit} id="updateForm">
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Name" value={updatedName} onChange={nameChangeHandle} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control placeholder="Surname" value={updatedSurname} onChange={surnameChangeHandle} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>City, Country</Form.Label>
                    <div className="city-country">
                        <Form.Control placeholder="City" value={updatedCity} onChange={cityChangeHandle} />
                        <Form.Control placeholder="Country" value={updatedCountry} onChange={countryChangeHandle} />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Job</Form.Label>
                    <Form.Control placeholder="Job" value={updatedJob} onChange={jobChangeHandle} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Additional information</Form.Label>
                    <Form.Control as="textarea" rows={3} value={updatedExtraInfo} onChange={extraInfoChangeHandle} />
                </Form.Group>
                <Form.Group controlId="Reference" className="mb-3">
                    <Form.Label>Add a new referense</Form.Label>
                    <Form.Control placeholder="Reference" onChange={ReferenceChangeHandle} value={updatedReference} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}