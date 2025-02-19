const Template_ = require("../models/templateModel");


class templateController {
    
  async add(data) {
    try {
      console.log("------------------Data received in controller-------------------------");
  
      // Remove empty or undefined fields
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => {
          // Keep non-empty arrays and non-null objects
          if (Array.isArray(value)) return value.length > 0;
          if (typeof value === "object" && value !== null) return Object.keys(value).length > 0;
          return value !== "" && value !== null && value !== undefined; // Keep non-empty strings
        })
      );
    
      // Create a new template with the filtered data
      const newTemplate = new Template_(filteredData);
  
      // Save the template to the database
      const result = await newTemplate.save();
  
      console.log("---------------------------Saved template------------------------------");
      return result; // Return the saved template
    } catch (error) {
      console.error("Error adding template data in controller:", error);
      throw error;  // Propagate the error if any
    }
  }

  async list({}) {
        try {
            const result = await Template_.find();
            return result
          } catch (error) {
            res.status(500).json({ error: "Error saving template" });
          }
  }  

  async fetch(email) {
      try {
          let result;
          
          if (email) {
              // Fetch templates by name if 'name' is provided
              result = await Template_.find({ email: email });
          } else {
              // If no 'name' is provided, fetch all templates
              result = await Template_.find();
          }
  
          return result;  // Return the result to be sent as the response
      } catch (error) {
          throw new Error('Error fetching templates: ' + error.message);  // Throw error if something goes wrong
      }
  }
  
  async addProfile(email,image){
    console.log("------------------Data received in controller-------------------------");
    try{
      const result = await Template_.updateOne(
        {
        email: email
        },{
        profilePicture: image
        })
        console.log("------------------Image added-------------------------");

      return result
    }catch(error){
      console.error("Error in /add route:", error);
      next(error);
    }
  }

  async addSignature(email,image){
    console.log("------------------Data received in controller-------------------------");
    try{
      const result = await Template_.updateOne(
        {
        email: email
        },{
          signature: image
        })
      console.log("------------------Image added-------------------------");

      return result
    }catch(error){
      console.error("Error in /add route:", error);
      next(error);
    }
  }

  async delete( _id ) {
		try {
			const result = await Template_.deleteMany({
				_id:_id,
			})
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

  async profileDelete( _id ) {
		try {
			const result = await Template_.updateOne({
				_id:_id
			},{ $unset: { profilePicture : 1 } }
    )
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

  async signatureDelete( _id ) {
		try {
			const result = await Template_.updateOne({
				_id:_id
			},{ $unset: { signature : 1 } }
    )
			return result
		} catch (error) {
			console.error(error)
			throw error
		}
	}

  async update(_id, dataToUpdate) {
    try {
      const result = await Template_.updateOne(
        { _id: _id },
        { $set: dataToUpdate } // Use $set to update fields
      );
  
      if (result.modifiedCount === 0) {
        return null; // No document was updated (e.g., incorrect ID)
      }
  
      return result;
    } catch (error) {
      console.error("Error in update function:", error);
      throw error;
    }
  }

}

module.exports = new templateController();



 // async save({name, content}) {
    //     try {
    //         const result = new Template_({ name, content });
    //         await result.save();
    //         return result
    //       } catch (error) {
    //         res.status(500).json({ error: "Error saving template" });
    //       }
    // } 