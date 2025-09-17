import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import PetGuide from "../assets/PetGuide.jpg";
const PetCareGuide = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="backdrop-blur-md min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom, #636e75 0%, #2c3e50 100%)",
      }}
    >
      {/* Navbar */}
      <nav className="bg-[#7d5946] shadow-lg px-6 py-4 flex justify-between items-center h-16 border-b-2 border-amber-900">
        <Link
          to={role === "owner" ? "/dashboard" : "/home"}
          className="flex items-center space-x-2 text-xl font-semibold text-white"
        >
          <img
            src={logo}
            alt="FurFind Logo"
            className="w-11 h-11 rounded-full hover:scale-105"
          />
          <span>FurFind</span>
        </Link>

        <div className="space-x-6 text-white font-medium">
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 ml-4 transition duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="flex flex-col">
        <div className="relative">
          <img
            src={PetGuide}
            alt="Pet Banner"
            className="w-full h-[460px] object-center opacity-60 bg-black"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl text-gray-300/80 font-bold drop-shadow-lg ">
              Pet Care Guide
            </h1>
          </div>
        </div>
        <div className="bg-[#7d5946] p-4 m-4 rounded-xl shadow-md hover:scale-[1.01] transition">
          <h3 className="text-2xl m-2 text-gray-200">
            1. Feed Them Healthy and Nutritious Food
          </h3>
          <p className="text-lg text-gray-200 m-2">
            Pets, like humans, need food that is tailored to their individual
            nutritional requirements. Dog diets are made to satisfy the dietary
            needs of dogs, and cat foods are made to meet the nutritional needs
            of cats. Importantly, their nutritional requirements are entirely
            different. Puppies need different types of food and nutrition than
            older dogs. Special diets may be a necessity for pets with medical
            conditions.
            <br />
            A lot of people tend to feed their pets under the table. However,
            this cannot be recommended for the health and benefit of your pet.
            Table scraps are usually not suitable for dogs and cats. Most of the
            things we consume, such as salt, garlic, and onions, are harmful to
            your pet’s wellness and cause them to become ill or even die.
            <br />
            Don’t forget to feed your pets the required amount of food. Obesity
            can be caused by overfeeding the pet or giving him too many treats,
            which can lead to heart failure, kidney problems, and other health
            issues. To avoid these conditions, it is best to weigh the food when
            it comes to feeding the pets. Always double-check with the vet if
            you are unsure of your pet’s dietary requirements.
          </p>
        </div>
        <div className="bg-[#7d5946] p-4 m-4 rounded-xl shadow-md hover:scale-[1.01] transition">
          <h3 className="text-2xl m-2 text-gray-200">
            2. Provide Them With Clean Water
          </h3>
          <p className="text-lg text-gray-200 m-2">
            Pets, just like people, need continuous access to water in order to
            stay alive. All pets under your care should have access to a clean,
            fresh bowl of water. Place it by their food bowl to make it readily
            available, and try to refill your pet’s water bowl at least twice a
            day. Your pet will stay healthy, hydrated, and happy with the
            availability of clean drinking water.
          </p>
        </div>
        <div className="bg-[#7d5946] p-4 m-4 rounded-xl shadow-md hover:scale-[1.01] transition">
          <h3 className="text-2xl m-2 text-gray-200">
            3. Pets Have to Attend to Nature’s Call Too
          </h3>
          <p className="text-lg text-gray-200 m-2">
            It is possible to toilet train several types of pets. It gives them
            the freedom to wander around the house without having accidents. You
            should make sure that at least one litter box is provided for cats.
            During the day, puppies need a potty break every one or two hours. A
            dog’s ability to hold it for hours varies depending on the age. A
            three-month-old puppy, for example, requires at least one toilet
            break every once in four hours. A trainer of yourself can train
            older dogs to hold, or you can introduce them to the options of
            doggy doors and potty pads.
            <br />
            Wherever your fur baby’s toilet is, make sure you clean it regularly
            to avoid dirt and bacteria accumulating in them. Hygiene is vital
            for health and well-being.
          </p>
        </div>

        <div className="bg-[#7d5946] p-4 m-4 rounded-xl shadow-md hover:scale-[1.01] transition">
          <h3 className="text-2xl m-2 text-gray-200">
            4. Make Sure Your Pets Stay Fit
          </h3>
          <p className="text-lg text-gray-200 m-2">
            Playtime is essential regardless of what kind of pet you get. Let it
            be a dog, cat or turtle; all animals like to play. This is an
            essential part of proper pet care, vital for your pet’s physical and
            mental well-being. Ever had your cat jump in the garbage or dog mess
            up your sofa? It is not misbehaviour but an indication that your pet
            is bored.
            <br />
            Socialisation can benefit your pet as well. Your puppy or kitten
            will connect with you and other pets if they learn appropriate
            socialization skills.
          </p>
        </div>

        <div className="bg-[#7d5946] p-4 m-4 rounded-xl shadow-md hover:scale-[1.01] transition">
          <h3 className="text-2xl m-2 text-gray-200">
            5. Vet Visits Are A Part of Pet Care
          </h3>
          <p className="text-lg text-gray-200 m-2">
            Regular trips to the vet as necessary are a responsibility of a pet
            owner. Your dog or cat should get a health check at least once or
            twice a year due to their shorter life than humans. When your pet is
            young, they may require to visit the vet more often, depending on
            their vaccination schedule. However, maintaining and ensuring your
            pet is healthy means you need to keep up with their vet
            appointments.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PetCareGuide;
