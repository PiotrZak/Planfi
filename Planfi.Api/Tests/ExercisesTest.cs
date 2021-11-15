using System.Collections.Generic;
using NUnit.Framework;
using PlanfiApi.Data.Entities;

namespace WebApi.Tests
{
    public class ExercisesTest
    {
        private List<Category> _categories;
        private List<Exercise> _exercises;
        private List<Plan> _plans;

        public void Setup()
        {
            _exercises = new List<Exercise>
            {
                new Exercise
                {
                    ExerciseId = "30c1fad5-8b77-4401-a8b0-639b3e2cede1",
                    Name = "Diamond pumps",
                    Description =
                    "Push-ups are an exercise performed to build strength and muscle mass in the arms, back, and chest. Modifications of push-ups resulted in personal coaches offering players various types of exercises with additional accessories. Which type of push-ups to train? Diamond pumps, wide or classic?",
                    Series = null,
                    Files = null,
                    CategoryId = "9af099ac-32d9-4fc9-bca7-27ef680464bd",
                    PlanId = "07caffc2-d88d-4c23-a754-584f4b103fc1",
                }
            };
            _categories = new List<Category>
            {
                new Category()
                {
                    CategoryId = "538562c2-9107-4005-881d-7aec37402487",
                    Title = "High Level",
                },
                new Category()
                {
                    CategoryId = "9af099ac-32d9-4fc9-bca7-27ef680464bd",
                    Title = "Medium Level",
                },
            };
            _plans = new List<Plan>()
            {
                new Plan()
                {
                    PlanId = "07caffc2-d88d-4c23-a754-584f4b103fc1",
                    Title = "Dedicated Plan for Yoga Member",
                    CreatorId = "e5a0dba6-761c-4a71-9c9a-6707058f09ff",
                    CreatorName = "Mr Miyagi",
                    OrganizationId = "7576d014-c227-4c3d-8ab4-8bfa83425f17",
                }
            };
        }

        [Test]
        public void ExerciseInCategory() {

            //arrange
            var category = _categories.Count;

            //act
            

            //assert
            Assert.AreEqual(1, category);
        }

}
}