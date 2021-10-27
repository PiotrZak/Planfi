import { commonUtil } from '../common.util';



describe('Common Bussiness Logic', () => {

    it('Get Unique returns unique records', async () => {

        //arrange
        const duplicatedData = [
            {name: "diamond pomps", times: 10, repeats: 5},
            {name: "diamond pomps", times: 15, repeats: 2},
        ]
        //act
        const results = commonUtil.getUnique(duplicatedData, 'name');
        //assert
        expect(results.length).toEqual(1);
    });

    it('Remove elements from Arrays', async () => {

        //arrange
        //act
        //assert
    });

});
