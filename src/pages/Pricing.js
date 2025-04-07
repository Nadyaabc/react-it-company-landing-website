import React, { Suspense, useState } from "react";
import styles from "../styles/pricing.module.css";
import pricingIcon1 from "../assets/images/svg/pricing-icon1.svg";
import pricingIcon2 from "../assets/images/svg/pricing-icon2.svg";
import pricingIcon3 from "../assets/images/svg/pricing-icon3.svg";
import blueTick from "../assets/images/png/blue-tick.png";
import darkBlueTick from "../assets/images/png/dark-blue-tick.png";
import redTick from "../assets/images/png/red-tick.png";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import "react-toastify/dist/ReactToastify.css";
const Pricing = () => {
  const { t, ready } = useTranslation("Pricing");
  const pricingData = t("plans", { returnObjects: true });
  const pricingDataIcons = [pricingIcon1, pricingIcon2, pricingIcon3];
  const pricingDataTicks = [blueTick, darkBlueTick, redTick];
  const allFeatures = t("features", { returnObjects: true });

  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCustomPlan, setShowCustomPlan] = useState(false);

  const handleFeatureToggle = (feature) => {
    const isSelected = selectedFeatures.some((f) => f.id === feature.id);
    if (isSelected) {
      setSelectedFeatures(selectedFeatures.filter((f) => f.id !== feature.id));
      setTotalPrice(totalPrice - feature.price);
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
      setTotalPrice(totalPrice + feature.price);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " BYN";
  };

  const handleOrder = (event) => {
    toast.success(t("successfulOrder"));
    setSelectedFeatures([]);
    setTotalPrice(0);
  };

  if (!ready) return <LoadingSpinner />;
  return (
    <div className={styles.container}>
      <Header />
      <main>
        <div className={styles.mainContainer}>
          <h1>{t("title")}</h1>
          <h3>{t("subtitle")}</h3>
          <div className={styles.mainContent}>
            <section className={styles.pricingGrid}>
              {pricingData.map((plans) => (
                <div key={plans.id} className={styles.pricingCard}>
                  <div className={styles.cardContent}>
                    <div className={styles.heading}>
                      <img src={pricingDataIcons[plans.id]} alt="icon" />
                      <h2>{plans.title}</h2>
                    </div>
                    <ul>
                      {plans.features.map((feature, index) => (
                        <li key={index}>
                          {feature}
                          <img src={pricingDataTicks[plans.id]} alt="tick" />
                        </li>
                      ))}
                    </ul>
                    <h2 className={styles.cost}>
                      {formatPrice(parseInt(plans.price))}
                    </h2>
                    <Link className={styles.order} to="/app-order">
                      <p className={styles.orderText}>{t("button")}</p>
                    </Link>
                  </div>
                </div>
              ))}
            </section>

            <div className={styles.customPlanToggle}>
              <button
                onClick={() => setShowCustomPlan(!showCustomPlan)}
                className={styles.toggleButton}
              >
                {showCustomPlan ? t("hide") : t("create")}
              </button>
            </div>

            {showCustomPlan && (
              <section className={styles.customPlanSection}>
                <h2>{t("individualPlan")}</h2>
                <p className={styles.firstParagraph}>{t("functionChoice")}</p>

                <div className={styles.customPlanGrid}>
                  <div className={styles.featuresList}>
                  {allFeatures.map((feature) => (
                    <label
                      key={feature.id}
                      className={`${styles.featureItem} ${
                        selectedFeatures.some((f) => f.id === feature.id)
                          ? styles.selected
                          : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFeatures.some((f) => f.id === feature.id)}
                        onChange={() => handleFeatureToggle(feature)}
                      />
                      <span>{feature.name}</span>
                      <span className={styles.featurePrice}>
                        +{formatPrice(feature.price)}
                      </span>
                    </label>
                  ))}
                     { /*<div
                        key={feature.id}
                        className={`${styles.featureItem} ${
                          selectedFeatures.some((f) => f.id === feature.id)
                            ? styles.selected
                            : ""
                        }`}
                      >
                        /*<label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={selectedFeatures.some(
                              (f) => f.id === feature.id
                            )}
                            onChange={() => handleFeatureToggle(feature)}
                          />
                          <span>{feature.name}</span>
                          <span className={styles.featurePrice}>
                            +{formatPrice(feature.price)}
                          </span>
                        </label>
                      </div>*/}

                  </div>

                  <div className={styles.customPlanSummary}>
                    <h3>{t("individualPlan")}</h3>
                    {selectedFeatures.length > 0 ? (
                      <>
                        <ul>
                          {selectedFeatures.map((feature) => (
                            <li key={feature.id}>
                              {feature.name}
                              <span className={styles.spanPrice}>
                                {formatPrice(feature.price)}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className={styles.totalPrice}>
                          <h3>{t("sum")}</h3>
                          <h3>{formatPrice(totalPrice)}</h3>
                        </div>
                        <a className={styles.orderPrice} onClick={handleOrder}>
                          <p className={styles.orderPriceText}>
                            {t("placeOrder")}
                          </p>
                        </a>
                      </>
                    ) : (
                      <p>{t("functionChoice")}</p>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default function WrappedPricing() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Pricing />
    </Suspense>
  );
}
