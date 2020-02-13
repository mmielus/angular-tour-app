CREATE TABLE rate
(
  id    serial PRIMARY KEY,
  value Integer
);

CREATE TABLE tour
(
  id              serial PRIMARY KEY,
  name            VARCHAR(50) NOT NULL,
  country         VARCHAR(50) NOT NULL,
  starDate        DATE        NOT NULL,
  endDate         DATE        NOT NULL,
  price           NUMERIC(7, 2),
  maxAmount       Integer,
  availableAmount Integer,
  description     VARCHAR(255),
  photoLink       VARCHAR(255),
  rateId          Integer,
  FOREIGN KEY (rateId) REFERENCES rate (id)
);
