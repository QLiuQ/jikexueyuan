const assert=require('assert');
const getPatternViaAction=require('../../lib/helper/get-pattern-via-action.js');

describe('测试 get-pattern-via-action.test.js ：', () => {
    it('should equals image', function () {
        const p = getPatternViaAction('uploadimage');
        assert.equal(p, "image", "uploadimage应该对应image");
    });

    it('should equals video', function () {
        const p = getPatternViaAction('uploadvideo');
        assert.equal(p, "video", "uploadvideo应该对应video");
    });

    it('should not equals video', function () {
        const p = getPatternViaAction('uploadsnapscreen');
        assert.notEqual(p, "video", "uploadsnapscreen不应该对应video");
    });

    it('should equals unknown', function () {
        const p = getPatternViaAction('uplodnapscn');
        assert.equal(p, "unknown", "传递一个莫名其妙的action应该返回unknown");
    });

});