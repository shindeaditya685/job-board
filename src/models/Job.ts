import { model, models, Schema } from "mongoose";

export interface JobRowProps {
  _id: string;
  orgId: string;
  orgName?: string;
  title: string;
  remote: string;
  type: string;
  salary: number;
  country: string;
  state: string;
  city: string;
  countryId: string;
  stateId: string;
  cityId: string;
  jobIcon: string;
  description: string;
  contactPhoto: string;
  contactName: string;
  contactPhone: number;
  createdAt: string;
  updatedAt: string;
  isAdmin?: boolean;
  contactEmail: string;
}

const JobSchema = new Schema(
  {
    orgId: { type: String, required: true },
    title: { type: String, required: true },
    remote: { type: String, required: true },
    type: { type: String, required: true },
    salary: { type: Number, required: true },
    country: { type: String, required: true },
    countryId: { type: String, required: true },
    state: { type: String, required: true },
    stateId: { type: String, required: true },
    city: { type: String, required: true },
    cityId: { type: String, required: true },
    jobIcon: { type: String },
    description: { type: String },
    contactPhoto: { type: String },
    contactName: { type: String, required: true },
    contactPhone: { type: Number, required: true },
    contactEmail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const JobModel = models?.Job || model("Job", JobSchema);
