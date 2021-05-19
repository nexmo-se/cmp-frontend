import Campaign from "entities/campaign";
import momentTimezone from "moment-timezone";
import validator from "validator";
import { createContext, Dispatch, FormEvent, SetStateAction } from "react";
import { DateTime } from "luxon";

import useError from "hooks/error";
import useCampaign from "hooks/campaign";
import { useContext, useState, useEffect } from "react";

interface FormContextProps {
  name: string;
  fromDate: DateTime | null;
  fromTime: DateTime | null;
  toDate: DateTime | null;
  toTime: DateTime | null;
  activeStartTime: DateTime | null;
  activeEndTime: DateTime | null;
  activeOnWeekends: boolean;
  timezone: string;
  isSubmitting: boolean;
  isClean: boolean;
  setName: Dispatch<SetStateAction<string>>;
  setFromDate: Dispatch<SetStateAction<DateTime | null>>;
  setFromTime: Dispatch<SetStateAction<DateTime | null>>;
  setToDate: Dispatch<SetStateAction<DateTime | null>>;
  setToTime: Dispatch<SetStateAction<DateTime | null>>;
  setActiveStartTime: Dispatch<SetStateAction<DateTime | null>>;
  setActiveEndTime: Dispatch<SetStateAction<DateTime | null>>;
  setActiveOnWeekends: Dispatch<SetStateAction<boolean>>;
  setTimezone: Dispatch<SetStateAction<string>>;
}

interface FormProps {
  children: any;
  initialValue?: Campaign;
  onSubmitted?: () => void;
}

const FormContext = createContext<FormContextProps>({} as FormContextProps);

function Form ({ initialValue, children, onSubmitted }: FormProps) {
  const [name, setName] = useState<string>("");
  const [fromDate, setFromDate] = useState<DateTime | null>(DateTime.local().startOf("day"));
  const [fromTime, setFromTime] = useState<DateTime | null>(DateTime.local().startOf("day").plus({ hours: 9 }));
  const [toDate, setToDate] = useState<DateTime | null>(DateTime.local().startOf("day"));
  const [toTime, setToTime] = useState<DateTime | null>(DateTime.local().startOf("day").plus({ hours: 18 }));
  const [activeStartTime, setActiveStartTime] = useState<DateTime | null>(DateTime.local().startOf("day").plus({ hours: 9 }));
  const [activeEndTime, setActiveEndTime] = useState<DateTime | null>(DateTime.local().startOf("day").plus({ hours: 18 }));
  const [activeOnWeekends, setActiveOnWeekends] = useState<boolean>(false);
  const [timezone, setTimezone] = useState<string>(momentTimezone.tz.guess());
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isClean, setIsClean] = useState<boolean>(false);
  const { throwError } = useError();
  const { create } = useCampaign();

  function cleanInput () {
    setName("");
    setFromDate(DateTime.local().startOf("day"));
    setFromTime(DateTime.local().startOf("day").plus({ hours: 9 }));
    setToDate(DateTime.local().startOf("day"));
    setToTime(DateTime.local().startOf("day").plus({ hours: 18 }));
    setActiveStartTime(DateTime.local().startOf("day").plus({ hours: 9 }));
    setActiveEndTime(DateTime.local().startOf("day").plus({ hours: 18 }));
    setActiveOnWeekends(false);
    setTimezone(momentTimezone.tz.guess());
  }

  async function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isClean) return;
    try {
      setIsSubmitting(true);
      if (!fromDate) return;
      if (!toDate) return;
      if (!fromTime) return;
      if (!toTime) return;
      if (!activeStartTime) return;
      if (!activeEndTime) return;

      const startDate = `${fromDate.toFormat("dd/MM/yyyy")} ${fromTime.toFormat("HH:mm")}`;
      const endDate = `${toDate.toFormat("dd/MM/yyyy")} ${toTime.toFormat("HH:mm")}`;

      await create({
        name,
        campaignStartDate: DateTime.fromFormat(startDate, "dd/MM/yyyy HH:mm").setZone(timezone),
        campaignEndDate: DateTime.fromFormat(endDate, "dd/MM/yyyy HH:mm").setZone(timezone),
        activeStartHour: parseInt(activeStartTime.toFormat("HH")),
        activeStartMinute: parseInt(activeStartTime.toFormat("mm")),
        activeEndHour: parseInt(activeEndTime.toFormat("HH")),
        activeEndMinute: parseInt(activeEndTime.toFormat("mm")),
        activeOnWeekends,
        timezone
      });

      cleanInput();
      if (onSubmitted) onSubmitted();
    } catch (err) {
      throwError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(
    () => {
      setIsClean(
        !validator.isEmpty(name) &&
        fromDate !== null &&
        fromTime !== null &&
        toDate !== null &&
        toTime !== null &&
        activeStartTime !== null &&
        activeEndTime !== null &&
        fromDate >= toDate
      )
    },
    [
      name,
      fromDate,
      fromTime,
      toDate,
      toTime,
      activeStartTime,
      activeEndTime
    ]
  );

  useEffect(
    () => {
      if (!initialValue) return;
      const activeStartTime = DateTime.fromObject({
        hour: initialValue.activeStartHour,
        minute: initialValue.activeStartMinute
      });

      const activeEndTime = DateTime.fromObject({
        hour: initialValue.activeEndHour,
        minute: initialValue.activeEndMinute
      });

      setName(initialValue.name);
      setFromDate(initialValue.campaignStartDate.startOf("day"));
      setFromTime(initialValue.campaignStartDate);
      setToDate(initialValue.campaignEndDate.startOf("day"));
      setToTime(initialValue.campaignEndDate);
      setActiveStartTime(activeStartTime);
      setActiveEndTime(activeEndTime);
      setTimezone(initialValue.timezone);
    },
    [initialValue]
  )

  return (
    <FormContext.Provider
      value={{
        name,
        fromDate,
        fromTime,
        toDate,
        toTime,
        activeStartTime,
        activeEndTime,
        activeOnWeekends,
        timezone,
        setName,
        setFromDate,
        setFromTime,
        setToDate,
        setToTime,
        setActiveStartTime,
        setActiveEndTime,
        setActiveOnWeekends,
        setTimezone,
        isSubmitting,
        isClean
      }}
    >
      <form onSubmit={handleSubmit}>
        {children}
      </form>
    </FormContext.Provider>
  )
}

export function useForm () {
  return useContext(FormContext);
}

export default Form;
