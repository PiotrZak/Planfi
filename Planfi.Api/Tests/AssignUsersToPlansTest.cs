using NUnit.Framework;
using PlanfiApi.Interfaces;

namespace PlanfiApi.Tests
{
    [TestFixture]
    public class AssignUsersToPlansTest
    {
        private IUserService _userService;

        [SetUp]
        public void Setup(IUserService userService)
        {
            _userService = userService;
        }

        [Test]
        public void AssignPlansToClients() {

            // [u1, u2]
            // to every user add plan
            // [p1, p2, p3, p4]
            
            //arrange
            string[] clientsIds = {"1", "2", "3"};
            string[] plansIds = {"1", "2", "3"};
            
            //act
            var result = _userService.AssignPlanToClients(clientsIds, plansIds);

            //assert
            Assert.AreEqual(result, 1);
        }

}
}