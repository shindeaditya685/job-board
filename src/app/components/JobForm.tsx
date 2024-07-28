"use client";

import {
  Button,
  RadioGroup,
  TextArea,
  TextField,
  Theme,
} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPerson,
  faPhone,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ImageUpload from "./ImageUpload";
import { saveJobAction } from "../actions/JobActions";
import { redirect } from "next/navigation";
import type { JobRowProps } from "@/models/Job";

interface SelectEvent {
  name: string;
  id: number;
}

const JobForm = ({
  orgId,
  jobDoc,
}: {
  orgId: string;
  jobDoc?: JobRowProps;
}) => {
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");

  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [cityId, setCityId] = useState(0);

  async function saveJob(data: FormData) {
    data.set("country", countryName);
    data.set("state", stateName);
    data.set("city", cityName);
    data.set("orgId", orgId);
    data.set("countryId", countryId.toString());
    data.set("stateId", stateId.toString());
    data.set("cityId", cityId.toString());
    const jobDoc = await saveJobAction(data);

    redirect(`/jobs/${jobDoc.orgId}`);
  }

  return (
    <Theme>
      <form action={saveJob} className="container mt-6 flex flex-col gap-4">
        {jobDoc && <input type="hidden" name="id" value={jobDoc?._id} />}
        <TextField.Root
          name="title"
          placeholder="Job title"
          defaultValue={jobDoc?.title}
        />

        <div className="grid md:grid-cols-3  gap-6">
          <div>
            Remote?
            <RadioGroup.Root
              defaultValue={jobDoc?.remote || "hybrid"}
              name="remote"
            >
              <RadioGroup.Item value="onsite">On-site</RadioGroup.Item>
              <RadioGroup.Item value="hybrid">Hybrid-remote</RadioGroup.Item>
              <RadioGroup.Item value="remote">Fully remote</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Fulltime?
            <RadioGroup.Root defaultValue={jobDoc?.type || "full"} name="type">
              <RadioGroup.Item value="project">Project</RadioGroup.Item>
              <RadioGroup.Item value="part">Part-time</RadioGroup.Item>
              <RadioGroup.Item value="full">Full-time</RadioGroup.Item>
            </RadioGroup.Root>
          </div>
          <div>
            Salary
            <TextField.Root name="salary" defaultValue={jobDoc?.salary || ""}>
              <TextField.Slot>$</TextField.Slot>
              <TextField.Slot>k/year</TextField.Slot>
            </TextField.Root>
          </div>
        </div>
        <div>
          Location
          <div className="flex flex-col sm:flex-row gap-4 *:grow">
            <CountrySelect
              defaultValue={
                countryId ? { id: countryId, name: countryName } : 0
              }
              onChange={(e: any) => {
                setCountryId(e.id);
                setCountryName(e.name);
              }}
              placeHolder="Select Country"
            />
            <StateSelect
              defaultValue={stateId ? { id: stateId, name: stateName } : 0}
              countryid={countryId}
              onChange={(e: any) => {
                setStateId(e.id);
                setStateName(e.name);
              }}
              placeHolder="Select State"
            />
            <CitySelect
              defaultValue={cityId ? { id: cityId, name: cityName } : 0}
              countryid={countryId}
              stateid={stateId}
              onChange={(e: any) => {
                setCityId(e.id);
                setCityName(e.name);
              }}
              placeHolder="Select City"
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2">
          <div className="md:w-1/3 w-full flex flex-col items-center justify-center">
            <h3>Job Icon</h3>
            <ImageUpload
              name="jobIcon"
              icon={faStar}
              defaultValue={jobDoc?.jobIcon || ""}
            />
          </div>
          <div className="grow">
            <h3>Contact Person</h3>
            <div className="flex gap-2">
              <div>
                <ImageUpload
                  name="contactPhoto"
                  icon={faUser}
                  defaultValue={jobDoc?.contactPhoto || ""}
                />
              </div>
              <div className="grow flex flex-col gap-1">
                <TextField.Root
                  placeholder="John Doe"
                  name="contactName"
                  defaultValue={jobDoc?.contactName}
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faUser} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  placeholder="Phone"
                  type="tel"
                  name="contactPhone"
                  defaultValue={jobDoc?.contactPhone}
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faPhone} />
                  </TextField.Slot>
                </TextField.Root>
                <TextField.Root
                  placeholder="Email"
                  type="email"
                  name="contactEmail"
                  defaultValue={jobDoc?.contactEmail}
                >
                  <TextField.Slot>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </TextField.Slot>
                </TextField.Root>
              </div>
            </div>
          </div>
        </div>
        <TextArea
          placeholder="Job description"
          resize="vertical"
          name="description"
          defaultValue={jobDoc?.description}
        />
        <div className="flex justify-center">
          <Button size="3">
            <span className="px-8">Save</span>
          </Button>
        </div>
      </form>
    </Theme>
  );
};

export default JobForm;
