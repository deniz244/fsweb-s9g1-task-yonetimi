import React from "react";
import { nanoid } from "nanoid";

import { useForm } from "react-hook-form";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  // task ekleme
  function myCustomSubmit(data) {
    submitFn({
      ...data,
      id: nanoid(5),
      status: "yapılacak",
    });
    reset();
  }

  return (
    <form className="taskForm" onSubmit={handleSubmit(myCustomSubmit)}>
      <div className="form-line">
        <label className="input-label">Başlık</label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
        />
        <p className="input-error">
          {errors.title && <span>{errors.title.message}</span>}
        </p>
      </div>

      <div className="form-line">
        <label className="input-label">Açıklama</label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        <p className="input-error">
          {errors.description && <span>{errors.description.message}</span>}
        </p>
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people", {
                  required: "Lütfen en az bir kişi seçin",
                  validate: (peoList) =>
                    peoList.length <= 3 || "En fazla 3 kişi seçebilirsiniz",
                })}
              />
              {p}
            </label>
          ))}
        </div>
        <p className="input-error">
          {errors.people && <span>{errors.people.message}</span>}
        </p>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
